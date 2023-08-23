import { UserEntity } from '@/types/user/User';
import axios from 'axios';
import { useSession } from 'next-auth/react';
import { useRouter } from 'next/navigation';
import { toast } from 'react-hot-toast';
import { useMutation } from "react-query";

const useAuth = () => {
    const router = useRouter() 
    const {data:session} = useSession()
    const accessToken = session?.user
    // console.log(accessToken)
 const getUser = async () =>  {
        try {
          // Perform the API request to get user details
          const response = await axios.get<UserEntity>(`${process.env.BASE_URL}/api/v1/auth/user/`, {
            headers: {
                Authorization: `Bearer ${accessToken}`
            }
            
          });
          // Return the response data
        //   console.log(response)
          return response.data;
        } catch (e: any) {
            throw e;
        }
      }

async function updateUserDetails(data:{}) {
    try {
      
        const response = await axios.patch(`${process.env.BASE_URL}/api/v1/auth/user/update`, data, {
          headers: {
            Authorization: `Bearer ${accessToken}`,
            'Content-Type': 'application/json',
          },
        });

        // Return response or handle success as needed
        // console.log(response)
        return response.data;
      } catch (error) {
        // Handle error, show error message, etc.
        throw error;
      }
}

const changePassword = async (data:any, initialPass:string) =>{
    try {
        const response = await axios.post(`${process.env.BASE_URL}/api/v1/auth/user/change-password`, data, {
          headers: {
            Authorization: `Bearer ${accessToken}`,
          },
        });
        // Return response or handle success as needed
        // console.log(response)
        toast.success("Password Updated")
        router.back()
        return response.data;
      } catch (error:any) {
        toast.error(error.message)
        // Handle error, show error message, etc.
        // throw error;
      }
}
  const uploadImage = async (file:any) => {
    const formData = new FormData();
    formData.append("roof_plan", file);
    console.log(formData)

    const response = await fetch(`${process.env.BASE_URL}/api/v1/core/roof-plan/`, {
      method: "POST",
      body: formData,
      headers: {
        Authorization: `Bearer ${accessToken}`,
        // Add other headers as needed
      },
    });

    if (!response.ok) {
      throw new Error("Image upload failed");
    }

    return response.json();
  };

  const { mutate, isLoading, isError, error } = useMutation(uploadImage);

  const fetchPhotosByStatus = async (status:any) => {
    const response = await fetch(`${process.env.BASE_URL}/api/v1/core/customer/roof-plans/?status=${status}`, {
      headers: {
        Authorization: `Bearer ${accessToken}`,

      },
    });
    if (!response.ok) {
      throw new Error('Network error'); // Handle error appropriately
    }
    return response.json();
  };
  

    return {getUser, updateUserDetails, changePassword, uploadImage: mutate, fetchPhotosByStatus}

}

export default useAuth
