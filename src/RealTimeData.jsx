import React, { useEffect, useState } from 'react';
import { Button, Dialog, DialogHeader, DialogBody, DialogFooter } from '@material-tailwind/react';

const RealTimeData = () => {
  const [data, setData] = useState([]);
  const [open, setOpen] = useState(false);

  const getRealTimeData = async () => {
    const response = await fetch(
      "https://corsproxy.io/?https://citizen.com/api/incident/trending?lowerLatitude=40.598061336584806&lowerLongitude=-74.50515876147978&upperLatitude=40.855689328103466&upperLongitude=-73.42684123852172&fullResponse=true&limit=20"
    );
    const json = await response.json();
    setData(json.results); // Assuming the structure contains a 'results' array
  };

  useEffect(() => {
    getRealTimeData();
  }, []);

  const handleOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  return (
    <>
    <div>
        {/* <div className='w-4 h-4 rounded p-2 m-2'> */}
      <Button onClick={handleOpen} variant="gradient">
      Traffic Updates
      </Button>
      {/* </div> */}

      <Dialog
        open={open}
        handler={handleClose}
        animate={{
          mount: { scale: 1, y: 0 },
          unmount: { scale: 0.9, y: -100 },
        }}
        className='h-[42rem] overflow-scroll'
      >
       <div className='flex justify-between'> <DialogHeader >Details of All Incidents  </DialogHeader><Button variant="text" color="red" onClick={handleClose} className="mr-1">
           X
          </Button></div>
        <DialogBody>
          {data.map((item, index) => (
            <div key={index} className="p-2 border-b">
              <h5 className="font-bold">Incident {index + 1}</h5>
              <p><strong>Incident Area:</strong> {item.address}</p>
              <p><strong>Category:</strong> {item.categories.join(", ")}</p>
              <p><strong>Report:</strong> {JSON.stringify(item.raw)}</p>
            </div>
          ))}
        </DialogBody>
        <DialogFooter>
          <Button variant="text" color="red" onClick={handleClose} className="mr-1">
            Close
          </Button>
        </DialogFooter>
      </Dialog>
      </div>
    </>
  );
}; 

export default RealTimeData;
