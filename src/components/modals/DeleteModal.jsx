import {
    Modal,
    ModalContent,
    // ModalHeader,
    ModalBody,
    ModalFooter,
    Button,
    useDisclosure,
  } from "@heroui/react";
  import { MdDeleteOutline } from "react-icons/md";
  import { RiDeleteBinLine } from "react-icons/ri";
  
  const Page = ({handleName}) => {
    const { isOpen, onOpen, onOpenChange } = useDisclosure();
    const actions = "px-[16px] font-semibold py-[5px] rounded text-[#ffffff]";
  
    const handleDelete = async (name) => {
      try {
        if (name === "visitor") {
          await deleteVisitor(token, id);
        }
      } catch (error) {
        console.error("Error deleting visitor:", error);
        // Additional error handling if needed
      } finally {
        onOpenChange(false); // Close the modal after deletion attempt
      }
    };
    
  
  
    return (
      <>
        <div className="relative group">
          <button
            className={`${actions} bg-[#C62828] hover:bg-[#B71C1C]`}
            onClick={onOpen}
          >
            <MdDeleteOutline />
          </button>
          <span className="z-10 absolute left-1/2 transform -translate-x-1/2 -bottom-8 px-2 py-1 text-xs text-white bg-black rounded opacity-0 group-hover:opacity-100 transition-opacity">
            Delete
          </span>
        </div>
  
        <Modal isOpen={isOpen} onOpenChange={onOpenChange}>
          <ModalContent>
            {(onClose) => (
              <div className="m-5">
                {/* <ModalHeader className="flex flex-col gap-1">
                  Delete User
                </ModalHeader> */}
                <ModalBody>
                  <div className="flex justify-center items-center">
                    <RiDeleteBinLine className="text-[56px] text-red-500" />
                  </div>
                  <p className="flex justify-center">
                    Are you sure you want to delete this {handleName}?
                  </p>
                </ModalBody>
                <ModalFooter>
                  <Button color="primary" onPress={onClose}>
                    Cancel
                  </Button>
                  <Button color="danger" onPress={() => handleDelete(handleName)}>
                    <RiDeleteBinLine /> Delete
                  </Button>
                </ModalFooter>
              </div>
            )}
          </ModalContent>
        </Modal>
      </>
    );
  };
  
  export default Page;
  