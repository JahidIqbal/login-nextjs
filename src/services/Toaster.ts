import { ResultWithoutData } from "@/api";
import { toast } from "sonner";

export function showToast(result: ResultWithoutData) {
  if (result?.success) {
    toast.success(result?.success);
  } else if (result?.error) {
    toast.error(result?.error);
  }
}
