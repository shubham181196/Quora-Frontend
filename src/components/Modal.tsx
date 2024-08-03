import { memo } from "react";
import  { FC, FormEvent } from 'react';


interface ModalProps {
  show: boolean;
  handleClose: () => void;
  handleSignUp: (event: FormEvent<HTMLFormElement>) => void;
}

const Modal: FC<ModalProps> = memo(({ show, handleClose, handleSignUp }) => {
  if (!show) {
    return null;
  }

  return (
    <div className="fixed inset-0 bg-gray-600 bg-opacity-50 flex items-center justify-center">
      <div className="bg-white p-8 rounded-md">
        <h2 className="text-lg font-semibold mb-4">Sign Up</h2>
        <form onSubmit={handleSignUp}>
          <label className="block mb-2">
            Email:
            <input type="email" name="email" className="border p-2 w-full" required />
          </label>
          <label className="block mb-4">
            Password:
            <input type="password" name="password" className="border p-2 w-full" required />
          </label>
          <div className="flex justify-between">
            <button type="submit" className="bg-blue-500 text-white p-2 rounded">Sign Up</button>
            <button type="button" className="bg-red-500 text-white p-2 rounded" onClick={handleClose}>Close</button>
          </div>
        </form>
      </div>
    </div>
  );
});

export default Modal;
