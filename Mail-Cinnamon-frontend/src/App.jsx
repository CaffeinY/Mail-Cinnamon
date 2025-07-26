import { useState } from 'react'
import './App.css'
import {
  Typography,
  Container,
  Box,
  TextField,
  FormControl,
  InputLabel,
  MenuItem,
  Select,
  Button,
  CircularProgress,

} from '@mui/material'
import axios from 'axios'


function App() {
  const [emailContent, setEmailContent] = useState('')
  const [tone, setTone] = useState('')
  const [generatedReply, setGeneratedReply] = useState('')
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState(null)

  const BASE_URL = 'http://localhost:8080'

  const handleSubmit = async () => {
    setLoading(true)
    setError(null)

    try {
      const response = await axios.post(`${BASE_URL}/api/email/generate`, {
        emailContent,
        tone,
      })

      setGeneratedReply(typeof response.data === 'string' ? response.data : JSON.stringify(response.data, null, 2))
    } catch (error) {
      setError("Failed to generate reply. Please try again later.")
      console.error('Error generating reply:', error)
    } finally {
      setLoading(false)
    }
  }

  return (
    <Container maxWidth="md" sx={{ py: 4 }}>
      {/* Header */}
      <Typography variant='h3' component={'h1'} gutterBottom>
        Email Reply Generator
      </Typography>

      {/* Email Content */}
      <Box sx={{ mx: 3 }}>
        <TextField
          fullWidth
          multiline
          rows={6}
          variant='outlined'
          label="Original Email Content"
          value={emailContent || ''}
          onChange={(e) => setEmailContent(e.target.value)}
          sx={{ mb: 2 }}
        />
        <FormControl fullWidth sx={{ mb: 2 }}>
          <InputLabel>Tone (Optional)</InputLabel>
          <Select
            value={tone || ''}
            label="Tone (Optional)"
            onChange={(e) => setTone(e.target.value)}>
            <MenuItem value="">None</MenuItem>
            <MenuItem value="friendly">Friendly</MenuItem>
            <MenuItem value="professional">Professional</MenuItem>
            <MenuItem value="casual">Casual</MenuItem>
          </Select>
        </FormControl>
        {/* Generate Reply Button */}
        <Button
          variant="contained"
          onClick={handleSubmit}
          disabled={!emailContent || loading}>
          {loading ? <CircularProgress size={24} /> : 'Generate Reply'}
        </Button>
      </Box>

      {/* Error Message */}
      {error && (
        <Typography color="error" sx={{ mb: 2 }}>
          Error: {error}
        </Typography>
      )}

      {/* Generated Reply */}
      {generatedReply && (
        <Box sx={{ mt: 3 }}>
          <Typography variant='h6' gutterBottom>
            Generated Reply
          </Typography>
          <TextField
            fullWidth
            multiline
            rows={6}
            variant='outlined'
            value={generatedReply || ''}
            slotProps={{
              readOnly: true,
            }}
          />

          {/* Copy to Clipboard Button */}
          <Button
            variant="outlined"
            sx={{ mt: 2 }}
            onClick={() => navigator.clipboard.writeText(generatedReply || '')}>
            Copy to Clipboard
          </Button>
        </Box>
      )}
      
    </Container>
  )
}

export default App
