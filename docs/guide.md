## Install NextJS with Tailwind CSS and dependencies:

```
npx create-next-app -e with-tailwindcss midjourney-dall-e-clone
cd midjourney-dall-e-clone
npm install file-saver @types/file-saver react-share openai @heroicons/react cors
npm install mongodb mongoose cloudinary
sudo npm install -g gh-pages --save-dev
npm run deploy
dig dalle.valynsilva.com +nostats +nocomments +nocmd
```

##

1 CNAME record
dalle valyndsilva.github.io.

4 A records
dalle 185.199.108.153
dalle 185.199.109.153
dalle 185.199.110.153
dalle 185.199.111.153

dig dalle.valynsilva.com

https://docs.github.com/en/pages/configuring-a-custom-domain-for-your-github-pages-site/managing-a-custom-domain-for-your-github-pages-site