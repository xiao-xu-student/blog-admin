FROM node:10
COPY ./ /blog-admin
WORKDIR /blog-admin
RUN npm install && npm run build

FROM nginx
RUN mkdir /blog-admin
COPY --from=0 /blog-admin/dist /blog-admin
COPY nginx.conf /etc/nginx/nginx.conf