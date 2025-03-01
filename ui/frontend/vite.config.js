import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

export default defineConfig({
  root: 'frontend', // Đặt thư mục chính là frontend
  build: {
    outDir: '../dist', // Đưa file build ra thư mục gốc
  },
  resolve: {
    alias: {
      '@': '/src', // Định nghĩa alias cho src
    },
  },
  plugins: [react()], // Nếu dùng React
});
