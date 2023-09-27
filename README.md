# The Uploader

A project to manage assets stored on the file system and on a S3 compatible bucket. The file system assets are stored on the `dist/files` folder, so they will not persist during develop.

Start by installing dependencies:

```
yarn install
```


Before start the development server make sure that you have a `.env` file with the same variables present at the `env.example`.

```
yarn redwood dev
```

*PS: This project was developed and test against a Cloudflare R2 bucket.*


