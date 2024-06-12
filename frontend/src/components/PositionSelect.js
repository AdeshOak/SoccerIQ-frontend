import  React,{useState} from 'react';
import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogTitle from '@mui/material/DialogTitle';
import InputLabel from '@mui/material/InputLabel';
import Grid from '@mui/material/Grid';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';

export default function PositionSelect({ onSelectValuesChange }) {

    const menuItems = [
        { value: "GK", label: "Goalkeeper" },
        {value:"LB", label:"Left-Back"},
        { value: "CB", label: "Centre-back" },
        { value: "RB", label: "Right-back" },
        {value:"RWB", label:"Right-Wing-Back"},
        {value:"CDM", label:"Central-Defensive-Midfielder"},
        {value:"CAM", label:"Central-Attacking-Midfielder"},
        {value:"CM", label:"Central-Midfielder"},
        {value:"RM", label:"Right-Midfielder"},
        {value:"LM", label:"Left-Midfielder"},
        {value:"LW", label:"Left-Wing"},
        {value:"RW", label:"Right-Wing"},
        {value:"ST", label:"Striker"},
        {value:"CF", label:"Center-Forward"},
      ];
      const menuItemsJSX = menuItems.map((item) => (
        <MenuItem key={item.value} value={item.value}>
          {item.label}
        </MenuItem>
      ));
      
      
  const [open, setOpen] = React.useState(false);

  const [selectValues, setSelectValues] = useState(
    Array.from({ length: 11 }, () => ({ value: "" }))
  );


  const handleChange = (index) => (event) => {
    const newSelectValues = [...selectValues];
    newSelectValues[index].value = event.target.value;
    setSelectValues(newSelectValues);
  };

  const selectBoxes = [];
  for (let i = 0; i < 11; i++) {
    selectBoxes.push(
      <FormControl fullWidth key={i} >
        <InputLabel id={`demo-simple-select-label-${i}`} sx={{
    color: 'primary.main',
    fontWeight: 'bold'
  }}>Position</InputLabel>
        <Select
          labelId={`demo-simple-select-label-${i}`}
          id={`demo-simple-select-${i}`}
          value={selectValues[i].value}
          label={`Age ${i + 1}`}
          onChange={handleChange(i)}
        sx={{width:'200px'}}
        >
          {menuItemsJSX}
        </Select>
      </FormControl>
    );
  }



  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = (event, reason) => {
    if (reason !== 'backdropClick') {
      setOpen(false);
      console.log(selectValues)
      onSelectValuesChange(selectValues); 
    }
  };



  return (
    <div style={{marginTop:'10px'}}>
      <Button onClick={handleClickOpen} sx={{fontWeight:'800'}}>SET POSITIONS</Button>
      <Dialog
        disableEscapeKeyDown
        open={open}
        onClose={handleClose}
        fullWidth
        maxWidth="lg"
      >
        <DialogTitle>Select 11 positions for each player from below form</DialogTitle>
        <DialogContent>
  <Grid container spacing={4}>
    <Grid item xs={12}>
      <Grid container spacing={15}>
        {selectBoxes.slice(0, 5).map((box, index) => (
          <Grid item xs={2} key={index} className="select-item">
            {box}
          </Grid>
        ))}
      </Grid>
    </Grid>
    <Grid item xs={12}>
      <Grid container spacing={15}>
        {selectBoxes.slice(5,10).map((box, index) => (
          <Grid item xs={2} key={index} className="select-item">
            {box}
          </Grid>
        ))}
      </Grid>
    </Grid>
    <Grid item xs={12}>
      <Grid container spacing={15}>
        {selectBoxes.slice(10).map((box, index) => (
          <Grid item xs={2} key={index} className="select-item">
            {box}
          </Grid>
        ))}
      </Grid>
    </Grid>
  </Grid>
  <style>
    {`
      .select-item {
        margin-top:4px;
        display: inline-block;
      }
    `}
  </style>
</DialogContent>

        <DialogActions>
          <Button onClick={handleClose}>Cancel</Button>
          <Button onClick={handleClose}>Ok</Button>
        </DialogActions>
      </Dialog>
    </div>
  );
}
