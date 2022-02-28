import React, {useState} from 'react';
import { DataGrid, GridColDef, GridSelectionModel } from '@mui/x-data-grid'; 
import { server_calls } from '../../api'; 
import { useGetData } from '../../custom-hooks'; 
import { Button,Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle } from '@mui/material'; // ADD THESE
import { HeroForm } from '../../components'; 

interface gridData{
  data:{
    id?:string;
  }
}

const columns: GridColDef[] = [
  { field: 'id', headerName: 'ID', width: 90 },
  {
    field: 'name',
    headerName: 'Name',
    width: 150,
    editable: true,
  },
  {
    field: 'description',
    headerName: 'Description',
    width: 150,
    editable: true,
  },
  {
    field: 'comics_appeared_in',
    headerName: 'Appearences',
    type: 'number',
    width: 150,
    editable: true,
  },
  {
    field: 'super_power',
    headerName: 'Super Power',
    description: 'Shoots lasers or somethin idk',
    sortable: false,
    width: 160
  },
];

export const DataTable =  () => {
  
  let { heroData, getData } = useGetData();
  let [open, setOpen] = useState(false);
  let [gridData, setData] = useState<GridSelectionModel>([])

  let handleOpen = () => {
    setOpen(true)
  }

  let handleClose = () => {
    setOpen(false)
  }

  let deleteData = async () => {
    for (let id in gridData){
      await server_calls.delete(id)
    }
    await server_calls.delete(`${gridData[0]}`)
    window.location.reload()
  }

  console.log(gridData) // a list of id's from checked rows

    return (
        <div style={{ height: 400, width: '100%' }}>
          <h2>Avengers Assembled</h2>
          <DataGrid 
						rows={heroData} 
						columns={columns} 
						pageSize={5} 
						checkboxSelection 
						onSelectionModelChange = {(newSelectionModel) => {setData(newSelectionModel);}}
						{...heroData}  
					/>

        <Button onClick={handleOpen}>Update</Button>
        <Button variant="contained" color="secondary" onClick={deleteData}>Delete</Button>

          {/*Dialog Pop Up begin */}
        <Dialog open={open} onClose={handleClose} aria-labelledby="form-dialog-title">
          <DialogTitle id="form-dialog-title">Update Hero</DialogTitle>
          <DialogContent>
            <DialogContentText>Hero id: {gridData[0]}</DialogContentText>
              <HeroForm id={`${gridData[0]}`}/>
          </DialogContent>
          <DialogActions>
            <Button onClick = {handleClose} color="primary">Cancel</Button>
            <Button onClick={handleClose} color = "primary">Done</Button> 
          </DialogActions>
        </Dialog>
        </div>
      );
}