<template>
    <div>
      <button @click="showModal" class="bg-blue-500 text-white px-4 py-2 rounded-md">Register</button>
      <div v-if="isModalOpen" class="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50">
        <div class="bg-white p-8 rounded-md shadow-lg md:w-8/12 lg:ml-6 lg:w-5/12">
          <h2 class="text-2xl font-semibold mb-4">Register</h2>
          <form @submit.prevent="submitForm">
            <div class="mb-4">
              <label for="name" class="block mb-2 font-medium">Name</label>
              <input v-model="formData.name" type="text" id="name" class="w-full px-3 py-2 border rounded-md">
            </div>
            <div class="mb-4">
              <label for="age" class="block mb-2 font-medium">Age</label>
              <input v-model.number="formData.age" type="number" id="age" class="w-full px-3 py-2 border rounded-md">
            </div>
            <div class="mb-4">
              <label for="email" class="block mb-2 font-medium">Email</label>
              <input v-model="formData.email" type="email" id="email" class="w-full px-3 py-2 border rounded-md">
            </div>
            <div class="mb-4">
              <label for="gender" class="block mb-2 font-medium">Gender</label>
              <select v-model="formData.gender" id="gender" class="w-full px-3 py-2 border rounded-md">
                <option value="male">Male</option>
                <option value="female">Female</option>
                <option value="other">Other</option>
              </select>
            </div>
            <div class="mb-4">
              <label for="username" class="block mb-2 font-medium">Username</label>
              <input v-model="formData.username" type="text" id="username" class="w-full px-3 py-2 border rounded-md">
            </div>
            <div class="mb-4">
              <label for="password" class="block mb-2 font-medium">Password</label>
              <input v-model="formData.password" type="password" id="password" class="w-full px-3 py-2 border rounded-md">
            </div>
            <div>
              <button type="submit" class="bg-blue-500 text-white px-4 py-2 rounded-md">Register</button>
              <button @click="closeModal" type="button" class="ml-2 text-gray-500">Cancel</button>
            </div>
          </form>
        </div>
      </div>
    </div>
  </template>
  
  <script>
  import { ref } from 'vue';
  import axios from 'axios';
  import router from '../../router';
  export default {

    name: 'RegisterComponent',
    
    setup() {
      const isModalOpen = ref(false);
      const formData = ref({
        name: '',
        age: null,
        email: '',
        gender: 'male',
        username: '',
        password: ''
      });
  
      const showModal = () => {
        isModalOpen.value = true;
      };
  
      const closeModal = () => {
        isModalOpen.value = false;
      };
  
      const submitForm = () => {
        // Your form submission logic here
        axios.post('http://localhost:3000/api/auth/register', formData.value)
        .then(res => {
          console.log(res.data);
          closeModal();
          router.push('/dashboard');
        })
        .catch(err => {
          console.log(err);
        });
      };
  
      return {
        isModalOpen,
        formData,
        showModal,
        closeModal,
        submitForm
      };
    }
  };
  </script>
  
  <style scoped>
  /* Your component-specific styles here */
  </style>
  