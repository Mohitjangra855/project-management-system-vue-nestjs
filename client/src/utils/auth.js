// utils/auth.js
import { ref } from "vue";

// Initial check - only set true if cookie exists and is not empty
const cookieValue = document.cookie
  .split(';')
  .find(row => row.trim().startsWith('cookie='))
  ?.split('=')[1];

export const isAuthenticated = ref(!!cookieValue && cookieValue !== '');

export function setLoggedIn() {
  isAuthenticated.value = true;
}

export function setLoggedOut() {
  document.cookie = "cookie=; Max-Age=0; path=/";
  isAuthenticated.value = false;
}
