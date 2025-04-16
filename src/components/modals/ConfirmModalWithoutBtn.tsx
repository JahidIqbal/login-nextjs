import {
  Modal,
  ModalContent,
  ModalBody,
  ModalFooter,
  Button,
} from "@heroui/react";
import { ReactNode, useState } from "react";
import { CiWarning } from "react-icons/ci";
import { ResultWithoutData } from "@/api";

interface Props {
  isOpen: boolean;
  onOpenChange: () => void;
  onConfirm: () => Promise<ResultWithoutData>;
  description?: ReactNode;
  destructive?: boolean;
}

function ConfirmModalWithoutBtn({
  isOpen,
  onOpenChange,
  onConfirm,
  description,
  destructive = false,
}: Props) {
  const [isLoading, setIsLoading] = useState<boolean>(false);

  return (
    <Modal
      isOpen={isOpen}
      onOpenChange={onOpenChange}
      classNames={{
        footer: `justify-center ${destructive ? "flex-row-reverse" : ""}`,
      }}
    >
      <ModalContent>
        {(onClose) => (
          <>
            <ModalBody>
              <div className="p-6 flex flex-col gap-4 items-center">
                <CiWarning size="8em" color="#ffeb3b" />
                <h2 className="text-2xl font-bold">Are you sure?</h2>
                {description}
              </div>
            </ModalBody>
            <ModalFooter>
              <Button
                color={destructive ? "primary" : "danger"}
                onPress={onClose}
              >
                No
              </Button>
              <Button
                color={destructive ? "danger" : "primary"}
                onPress={async () => {
                  setIsLoading(true);
                  const result = await onConfirm();
                  setIsLoading(false);
                  if (result.success) onClose();
                }}
              >
                {isLoading ? "Loading" : "Yes"}
              </Button>
            </ModalFooter>
          </>
        )}
      </ModalContent>
    </Modal>
  );
}

export default ConfirmModalWithoutBtn;
