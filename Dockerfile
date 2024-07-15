#COPY rules/ /app/rules/
#COPY config/ /app/config/
#FROM adrien92/kexadocker:v0.2.3


# Use the release image from the first Dockerfile as the base image
FROM innovtech/kexaction:v1.0

# Copy additional files into the image
COPY ./rules/* /app/rules/
COPY ./config/* /app/config/


# Display content of files inside the config folder at runtime
CMD ["sh", "-c", "cat /app/config/* && pnpm run start:nobuild"]
