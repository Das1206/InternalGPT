import { ReactNode } from 'react';
import { Button, Modal } from "flowbite-react";

interface Props {
    title: string,
    open: boolean,
    handleOpen: (open: boolean) => void,
    children: ReactNode,
    handleSubmit: () => void,
    loading: boolean
}
const CustomModal = ({ title, handleOpen, open, children, handleSubmit, loading }: Props) => {

    return (
        <>

            <Modal show={open} onClick={() => handleOpen(false)}>
                <>
                    <Modal.Header>
                        <div className="flex items-center justify-center w-full">
                            {title}
                        </div>
                    </Modal.Header>
                    <Modal.Body>
                        {
                            children
                        }
                    </Modal.Body>
                    <Modal.Footer style={{ justifyContent: "end" }}>
                        <Button color="gray" onClick={() => handleOpen(false)}>
                            Cancel
                        </Button>
                        <Button color="dark" disabled={loading} onClick={handleSubmit}>
                            Save
                        </Button>
                    </Modal.Footer>
                </>

            </Modal>
        </>
    );
};

export default CustomModal;