import { useDisclosure } from "@heroui/react";
import { ReactNode } from "react";
import { ResultWithoutData } from "@/api";
import ConfirmModalWithoutBtn from "./ConfirmModalWithoutBtn";

interface Props {
  buttonContent: ReactNode;
  onConfirm: () => Promise<ResultWithoutData>;
  destructive?: boolean;
}

export default function ConfirmModal({ buttonContent, onConfirm, destructive = false }: Props) {
  const { isOpen, onOpen, onOpenChange } = useDisclosure();

  return (
    <>
      <button onClick={onOpen}>{buttonContent}</button>
      <ConfirmModalWithoutBtn
        isOpen={isOpen}
        onOpenChange={onOpenChange}
        onConfirm={onConfirm}
        destructive={destructive}
      />
    </>
  );
}
