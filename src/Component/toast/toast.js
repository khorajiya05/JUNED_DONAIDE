import { toast } from "react-toastify";

const errorToast = (msg) => {
  toast.error(msg);
  toast.clearWaitingQueue();
};
const successToast = (msg) => toast.success(msg);
const warningToast = (msg) => toast.warning(msg);
export { errorToast, successToast, warningToast };