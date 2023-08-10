<template>
    <div>
      <h1 class="text-3xl font-semibold mb-4">User Management</h1>
      <p v-if="isLogin" class="text-green-500">Logged in!</p>
      <p v-else class="text-red-500">Not logged in.</p>
      <p v-if="accessToken" class="mt-2">Access Token: {{ accessToken }}</p>
  
      <button @click="getUserData" class="mt-4 bg-blue-500 text-white px-4 py-2 rounded-md hover:bg-blue-600">Get User Data</button>
      
      <table class="w-full border-collapse mt-4">
        <thead>
          <tr>
            <th class="border p-2">#</th>
            <th class="border p-2">Name</th>
            <th class="border p-2">Email</th>
            <th class="border p-2">Gender</th>
            <th class="border p-2">Age</th>
            <th class="border p-2">Actions</th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="(user, index) in userData" :key="user.id" class="bg-gray-100">
            <td class="border p-2">{{ index + 1 }}</td>
            <td class="border p-2">{{ user.name }}</td>
            <td class="border p-2">{{ user.email }}</td>
            <td class="border p-2">{{ user.gender }}</td>
            <td class="border p-2">{{ user.age }}</td>
            <td class="border p-2">
              <button @click="editUser(user)" class="text-blue-500">Edit</button>
              <button @click="deleteUser(user.id)" class="text-red-500 ml-2">Delete</button>
            </td>
          </tr>
        </tbody>
      </table>


      <teleport to="body">
      <div v-if="showModelEdit" class="fixed inset-0 flex justify-center items-center bg-black bg-opacity-50">
        <div class="bg-white p-4 rounded-lg">
          <h2 class="text-xl font-semibold mb-4">Edit User</h2>
          <form @submit.prevent="saveUserChanges(userEdit)">
            <label class="block mb-2">
              Name:
              <input v-model="userEdit.name" class="border rounded p-2 w-full" />
            </label>
            <label class="block mb-2">
              Email:
              <input v-model="userEdit.email" class="border rounded p-2 w-full" />
            </label>
            <label class="block mb-2">
              Gender:
              <input v-model="userEdit.gender" class="border rounded p-2 w-full" />
            </label>
            <label class="block mb-2">
              Age:
              <input v-model="userEdit.age" class="border rounded p-2 w-full" />
            </label>
            <!-- Other input fields for editing user details -->
            <div class="mt-4 flex justify-end">
              <button type="submit" class="bg-blue-500 text-white px-4 py-2 rounded-md hover:bg-blue-600">Save</button>
              <button @click="cancelEditing" class="ml-2">Cancel</button>
            </div>
          </form>
        </div>
      </div>
    </teleport>
    </div>
  </template>
  
  
  <script>
  import axios from 'axios';
  import { ref, computed, onMounted } from 'vue';
  
  export default {
    name: 'DashboardComponent',
    setup() {
        let accessToken = ref(localStorage.getItem('accessToken').replaceAll('"', ''));
    let isLogin = computed(()=> accessToken.value !== null)
      let userData = ref([]);
      let userEdit = ref({});
      const showModelEdit = ref(false);
      
      const getUserData = async () => {
        userData.value = [];
        console.log(accessToken.value);
        try {
          const response = await axios.get('http://localhost:3000/api/users/', {
            headers: {
              Authorization: `Bearer ${accessToken.value}`
            }
          });
  
          // console.log(response.data);
          userData.value = response.data;
        } catch (error) {
          console.error('Error fetching user data:', error);
        }
      };
  
      function editUser(user)
      {
        userEdit.value = { ...user };
        showModelEdit.value = true;
      }    
      async function deleteUser(id)
      {   console.log("aaa")
          try
          {
            const res =  await axios.delete("http://localhost:3000/api/users/"+id,{
              headers:{
                Authorization: `Bearer ${accessToken.value}`
              }
             })
             console.log(res.response)
          } catch(err)
          {
           console.log(err)
          }
      }
      const saveUserChanges = async (user) => {
      try
      {
          await axios.put("http://localhost:3000/api/users/"+user.id,userEdit.value, {
          headers: {
            Authorization: `Bearer ${accessToken.value}`
          }})

          showModelEdit.value = false;
      }catch(err)
      { 
        console.log(err)
      }
      console.log(userEdit.value);
      
      };
      const cancelEditing = () => {
      showModelEdit.value = false;
    };
    onMounted(()=>
    {
      getUserData()
    })

      return {
        userData,
        getUserData,
        accessToken,
        isLogin,
        editUser,
        userEdit,
        showModelEdit,
        saveUserChanges,
        cancelEditing,
        deleteUser,
        onMounted
      };
    }
  };
  </script>
  

  