import React, { useState, useEffect } from 'react'
import { Dialog, DialogContent, Typography, IconButton, Slide } from '@mui/material'
import CloseIcon from '@mui/icons-material/Close'

const Transition = React.forwardRef(function Transition(props, ref) {
  return <Slide direction="down" ref={ref} {...props} />
})

export default function BookmarkPopup() {
  const [open, setOpen] = useState(false)

  useEffect(() => {
    const timer = setTimeout(() => setOpen(true), 2000)
    return () => clearTimeout(timer)
  }, [])

  const handleClose = () => setOpen(false)

  return (
    <Dialog
      open={open}
      TransitionComponent={Transition}
      onClose={handleClose}
      PaperProps={{
        sx: {
          position: 'fixed',
          top: 20,
          m: 0,
          maxWidth: 400,
          borderRadius: 3,
          background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
          boxShadow: '0 8px 32px rgba(102, 126, 234, 0.3)'
        }
      }}
    >
      <DialogContent sx={{ p: 3, pb: 1 }}>
        <Typography variant="body1" sx={{ mb: 2, textAlign: 'center', color: 'white', fontWeight: 500 }}>
          Please bookmark our website to get best deals in the future!
        </Typography>
        <IconButton
          onClick={handleClose}
          sx={{ 
            position: 'absolute', 
            bottom: 8, 
            right: 8,
            color: 'rgba(255,255,255,0.8)',
            '&:hover': { color: 'white', backgroundColor: 'rgba(255,255,255,0.1)' }
          }}
          size="small"
        >
          <CloseIcon fontSize="small" />
        </IconButton>
      </DialogContent>
    </Dialog>
  )
}