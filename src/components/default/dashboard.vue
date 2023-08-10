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
          </tr>
        </thead>
        <tbody>
          <tr v-for="(user, index) in userData" :key="user.id" class="bg-gray-100">
            <td class="border p-2">{{ index + 1 }}</td>
            <td class="border p-2">{{ user.name }}</td>
            <td class="border p-2">{{ user.email }}</td>
            <td class="border p-2">{{ user.gender }}</td>
            <td class="border p-2">{{ user.age }}</td>
          </tr>
        </tbody>
      </table>
    </div>
  </template>
  
  
  <script>
  import axios from 'axios';
  import { ref, computed } from 'vue';
  
  export default {
    name: 'DashboardComponent',
    setup() {
        const accessToken = ref(localStorage.getItem('accessToken').replaceAll('"', ''));
    const isLogin = computed(()=> accessToken.value !== null)
      const userData = ref([]);
      
      const getUserData = async () => {
        console.log(accessToken.value);
        try {
          const response = await axios.get('http://localhost:3000/api/users/', {
            headers: {
              Authorization: `Bearer ${accessToken.value}`
            }
          });
  
          console.log(response.data);
          userData.value = response.data;
        } catch (error) {
          console.error('Error fetching user data:', error);
        }
      };
      
      return {
        userData,
        getUserData,
        accessToken,
        isLogin
      };
    }
  };
  </script>
  
  <style>
  /* Your styles here */
  </style>
  