import { useEffect, useState } from "react"
import { useAuth } from "../context/AuthContext"
import axios from "axios"
import { Container, Typography, Grid, Card, CardContent, Button, createTheme, ThemeProvider } from "@mui/material"
import { DataGrid } from "@mui/x-data-grid"
import { BarChart, Bar, XAxis, YAxis, Tooltip, Legend } from "recharts"

const theme = createTheme({
  palette: {
    primary: {
      main: "#3f51b5",
    },
    secondary: {
      main: "#f50057",
    },
    background: {
      default: "#f5f5f5",
    },
  },
})

const AdminDashboard = () => {
  const { user, logout } = useAuth()
  const [metrics, setMetrics] = useState({
    totalUsers: 0,
    totalBeneficiaries: 0,
    totalTokens: 0,
  })
  const [users, setUsers] = useState([])
  const [beneficiaries, setBeneficiaries] = useState([])
  const [tokens, setTokens] = useState([])

  // Fetch dashboard metrics
//   const fetchMetrics = async () => {
//     try {
//       const response = await axios.get("https://hackathon-backend-wfhw.onrender.com/admin/metrics", {
//         withCredentials: true,
//       })
//       setMetrics(response.data.data)
//     } catch (err) {
//       console.error("Failed to fetch metrics:", err)
//     }
//   }

  // Fetch all users
  const fetchUsers = async () => {
    try {
      const response = await axios.get("https://hackathon-backend-wfhw.onrender.com/user/all-users", {
        withCredentials: true,
      })
      setUsers(response.data.data)
    } catch (err) {
      console.error("Failed to fetch users:", err)
    }
  }

  // Fetch all beneficiaries
  const fetchBeneficiaries = async () => {
    try {
      const response = await axios.get("https://hackathon-backend-wfhw.onrender.com/beneficiary", {
        withCredentials: true,
      })
      setBeneficiaries(response.data.data)
    } catch (err) {
      console.error("Failed to fetch beneficiaries:", err)
    }
  }

  // Fetch all tokens
  const fetchTokens = async () => {
    try {
      const response = await axios.get("https://hackathon-backend-wfhw.onrender.com/token", { withCredentials: true })
      setTokens(response.data.data)
    } catch (err) {
      console.error("Failed to fetch tokens:", err)
    }
  }

  useEffect(() => {
    //fetchMetrics()
    fetchUsers()
    fetchBeneficiaries()
    fetchTokens()
  }, [])

  // DataGrid columns for users
  const userColumns = [
    { field: "CNIC", headerName: "CNIC", width: 200 },
    { field: "name", headerName: "Name", width: 200 },
    { field: "role", headerName: "Role", width: 150 },
    {
      field: "actions",
      headerName: "Actions",
      width: 150,
      renderCell: (params) => (
        <Button variant="contained" color="secondary" onClick={() => handleDeleteUser(params.row._id)}>
          Delete
        </Button>
      ),
    },
  ]

  // DataGrid columns for beneficiaries
  const beneficiaryColumns = [
    { field: "CNIC", headerName: "CNIC", width: 200 },
    { field: "name", headerName: "Name", width: 200 },
    { field: "purpose", headerName: "Purpose", width: 150 },
    { field: "tokens", headerName: "Tokens", width: 150 },
  ]

  // DataGrid columns for tokens
  const tokenColumns = [
    { field: "tokenId", headerName: "Token ID", width: 200 },
    { field: "department", headerName: "Department", width: 150 },
    { field: "status", headerName: "Status", width: 150 },
    {
      field: "actions",
      headerName: "Actions",
      width: 150,
      renderCell: (params) => (
        <Button variant="contained" color="primary" onClick={() => handleUpdateToken(params.row._id)}>
          Update
        </Button>
      ),
    },
  ]

  // Handle user deletion
  const handleDeleteUser = async (userId) => {
    try {
      await axios.delete(`https://hackathon-backend-wfhw.onrender.com/user/delete/${userId}`, { withCredentials: true })
      fetchUsers() // Refresh user list
    } catch (err) {
      console.error("Failed to delete user:", err)
    }
  }

  // Handle token status update
  const handleUpdateToken = async (tokenId) => {
    try {
      await axios.put(
        `https://hackathon-backend-wfhw.onrender.com/token/${tokenId}`,
        { status: "completed" },
        { withCredentials: true },
      )
      fetchTokens() // Refresh token list
    } catch (err) {
      console.error("Failed to update token:", err)
    }
  }

  return (
    <ThemeProvider theme={theme}>
      <Container>
        <Typography variant="h4" align="center" gutterBottom>
          Admin Dashboard
        </Typography>
        <Grid container spacing={3}>
          {/* Metrics Overview */}
          <Grid item xs={12} md={4}>
            <Card sx={{ bgcolor: "primary.main", color: "primary.contrastText" }}>
              <CardContent>
                <Typography variant="h6">Total Users</Typography>
                <Typography variant="h4">{metrics.totalUsers}</Typography>
              </CardContent>
            </Card>
          </Grid>
          <Grid item xs={12} md={4}>
            <Card sx={{ bgcolor: "secondary.main", color: "secondary.contrastText" }}>
              <CardContent>
                <Typography variant="h6">Total Beneficiaries</Typography>
                <Typography variant="h4">{metrics.totalBeneficiaries}</Typography>
              </CardContent>
            </Card>
          </Grid>
          <Grid item xs={12} md={4}>
            <Card sx={{ bgcolor: "#4caf50", color: "white" }}>
              <CardContent>
                <Typography variant="h6">Total Tokens</Typography>
                <Typography variant="h4">{metrics.totalTokens}</Typography>
              </CardContent>
            </Card>
          </Grid>

          {/* Users Table */}
          <Grid item xs={12}>
            <Typography variant="h6" gutterBottom>
              Users
            </Typography>
            <div style={{ height: 400, width: "100%" }}>
              <DataGrid
                rows={users}
                columns={userColumns}
                pageSize={5}
                rowsPerPageOptions={[5]}
                getRowId={(row) => row._id}
                sx={{
                  "& .MuiDataGrid-row:nth-of-type(odd)": {
                    backgroundColor: "rgba(0, 0, 0, 0.04)",
                  },
                }}
              />
            </div>
          </Grid>

          {/* Beneficiaries Table */}
          <Grid item xs={12}>
            <Typography variant="h6" gutterBottom>
              Beneficiaries
            </Typography>
            <div style={{ height: 400, width: "100%" }}>
              <DataGrid
                rows={beneficiaries}
                columns={beneficiaryColumns}
                pageSize={5}
                rowsPerPageOptions={[5]}
                getRowId={(row) => row._id}
                sx={{
                  "& .MuiDataGrid-row:nth-of-type(odd)": {
                    backgroundColor: "rgba(0, 0, 0, 0.04)",
                  },
                }}
              />
            </div>
          </Grid>

          {/* Tokens Table */}
          <Grid item xs={12}>
            <Typography variant="h6" gutterBottom>
              Tokens
            </Typography>
            <div style={{ height: 400, width: "100%" }}>
              <DataGrid
                rows={tokens}
                columns={tokenColumns}
                pageSize={5}
                rowsPerPageOptions={[5]}
                getRowId={(row) => row._id}
                sx={{
                  "& .MuiDataGrid-row:nth-of-type(odd)": {
                    backgroundColor: "rgba(0, 0, 0, 0.04)",
                  },
                }}
              />
            </div>
          </Grid>
        </Grid>

        {/* Logout Button */}
        <Button
          variant="contained"
          color="secondary"
          onClick={logout}
          sx={{ mt: 3, bgcolor: "#f44336", "&:hover": { bgcolor: "#d32f2f" } }}
        >
          Logout
        </Button>
      </Container>
    </ThemeProvider>
  )
}

export default AdminDashboard

