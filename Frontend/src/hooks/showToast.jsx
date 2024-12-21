import { toast } from "react-toastify";
import { useCallback } from "react";

const useShowToast = () => {
  const showToast = useCallback((title, description, status) => {
    toast[status](
      <div>
        <strong>{title}</strong>
        <p>{description}</p>
      </div>, 
      {
        position: "bottom-right" ,
        autoClose: 3000,
        hideProgressBar: true,
        closeButton: true,
      }
    );
  }, []);

  return showToast;
};

export default useShowToast;
