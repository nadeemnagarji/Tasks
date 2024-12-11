import { Button } from "antd"
import { Modal } from "antd";
import { useState } from "react";
import InputForm from "./Form";

function Navbar() {
    const [isModalOpen, setIsModalOpen] = useState(false);
    const showModal = () => {
        setIsModalOpen(true);
      };
    
      const handleOk = () => {
        setIsModalOpen(false);
      };
    
      const handleCancel = () => {
        setIsModalOpen(false);
      };
    
  return (
    <div className="w-ful  px-2 py-4 flex justify-between items-center border-b shadow-lg">
      <h4>Tasks</h4>
    <div className="w-max  flex items-center gap-4">
        <Button onClick={showModal} type={"primary"} variant={"solid"}  className="
        text-md text-bold"> Create Task</Button>
         <Modal title="Basic Modal" className=" m-auto text-center" open={isModalOpen} onOk={handleOk} onCancel={handleCancel}>
      <InputForm submit={handleOk} />
      </Modal>
    </div>
    </div>  
  )
}

export default Navbar
