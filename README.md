# Blog system with remix and supabase

Today we're creating a remix blog system using supabase!

### First things first:

Clone this repository, to know how to clone it please refer to this [doc](https://docs.github.com/en/repositories/creating-and-managing-repositories/cloning-a-repository).
Now that you've clone it, `cd` to the folder where you cloned this repository.

Now you do `npm install` or `yarn install` or `pnpm install` on the parent folder.

After installing all the packages you just need to run `npm run/yarn/pnpm dev`. But oops! an error, you didn't specified a supabase url and an anon key!
You can refer to "Setting up supabase".

---

### Setting up supabase:

Alright, there's an error when you run the dev cmd, it's because you haven't specified a supabase anon key and a url in the `.env.example` file.

First, create a new project in [app.supabase.io](https://app.supabase.io)

(**NOTE:** You must have organization created first before creating a new project!)

and then after that go to the table editor of your project and then create a new table and name it _(posts)_ but if you want to change to something else, change the name to something else but you need to change the table name too in the `app/supabase.server.ts`.
Now put the following column names and types:

```
slug - text
title - text
content - varchar
```

Great! you did it, now you need todo is copy your project's url and anon key in `settings > API`

now paste it onto the .env file (the .env i'm saying is the one .env.example you need to remove the .example)

we're good now yea?

now run the `dev` command! We should see the data getting send and being retrieve :o

---

### Conclusion

That's all for now for our **remix blog with supabase**! Make sure you check out my blogs on my [website](https://johnsiras.netlify.app) for more awesome projects (Btw i'm still working on it so expect to have bugs 😅 sorry about that.)

If it there's any errors pls open an issue on this repository! Or pull a request.

Thanks and have a good day yall!

### To change template:

As this uses express some of the user wants other hosts that's why i keep this instruction from the remix repo so you can use any hosts :) follow the instructions below:

When you ran `npx create-remix@latest` there were a few choices for hosting. You can run that again to create a new project, then copy over your `app/` folder to the new project that's pre-configured for your target server.

```sh
cd ..
# create a new project, and pick a pre-configured host
npx create-remix@latest
# or
yarn create remix
# or
pnpm create remix

# ---

cd my-new-remix-app
# remove the new project's app (not the old one!)
rm -rf app
# copy your app over
cp -R ../my-old-remix-app/app app
```
