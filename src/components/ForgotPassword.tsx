import { useCallback } from "react";
import React, { FormEvent, memo, useState } from 'react';

interface ForgotPass {
    showForgotPass:boolean
    handleClose:()=> void
}
const ForgotPasswordForm: React.FC<ForgotPass> =memo( ({showForgotPass,handleClose}) => {
  const [email, setEmail] = useState<string>('');
  const [responseMessage, setResponseMessage] = useState<string>('');
  console.log(showForgotPass);
    if(showForgotPass===false) return null;
    const handleForgotPassword = useCallback(async (event: FormEvent<HTMLFormElement>) => {
        event.preventDefault();
    
        // Create a FormData object from the form
        const formData = new FormData(event.currentTarget);
    
        // Optionally, you can convert FormData to a plain object
        const data: { [key: string]: string } = {};
        formData.forEach((value, key) => {
          data[key] = value as string;
        });
    
        try {
          const response = await fetch('http://localhost:8080/auth/forgot-password', {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json',
            },
            body: JSON.stringify(data), // Convert the data object to a JSON string
          });
    
          if (!response.ok) {
            throw new Error('Network response was not ok');
          }
    
          const result = await response.json(); // Assuming the response is JSON
          setResponseMessage(result.message);
        } catch (error) {
          console.error('There was a problem with the fetch operation:', error);
          setResponseMessage('An error occurred. Please try again.');
        }
      },[]);
    
      return (
        <div className="fixed inset-0 bg-gray-600 bg-opacity-50 flex items-center justify-center">
        <div className="bg-white p-8 rounded-md">
          <h2 className="text-lg font-semibold mb-4">Forgot Password</h2>
          <form >
            <label className="block mb-2">
              Email:
              <input type="email" name="email" className="border p-2 w-full" required onChange={(e)=>{setEmail(e.target.value)}}/>
            </label>
            
            <div className="flex justify-between">
              <button type="submit" className="bg-blue-500 text-white p-2 rounded">Submit</button>
              <button type="button" className="bg-red-500 text-white p-2 rounded" onClick={handleClose}>Close</button>
            </div>
          </form>
        </div>
      </div>
      );
    
});

export default ForgotPasswordForm;
