FROM nginx
COPY /src/pages/Institucional/Home/Home.jsx /usr/share/nginx/html
EXPOSE 80
CMD ["nginx", "-g", "daemon off;"]