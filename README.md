# victorvation.github.io
My personal website: [victorszeto.com](http://www.victorszeto.com). Built mostly with jQuery, HTML and SASS. `app` contains the source code, `blog` contains the [wintersmith](http://wintersmith.io) blog source, and `dist` contains production files. Some zen (read: premature) optimization with minifying the files and HTML using gulp tasks. Unnecessary, but it's fun to see the filesizes shrink.

If you want to read the source, the main interesting parts are in `app/index.html` and `app/scripts/app.js`.

The site is hosted on Github pages, I use git-subtree to push source code to the `dev` branch and only the `dist` folder to master. I use Cloudflare for DNS hosting, apparently their CNAME flattening feature makes it so Github pages that are hosted on apex domains (i.e. `victorszeto.com`, not `www.victorzeto.com`) don't get bounced around on redirects. So there's that.

## Building
1. Build and package files: `gulp` to build the files into `dist`
2. `git commit -am` to commit all changes & built files
3. Deploy the site: `git subtree push --prefix dist origin master` to push the `dist` folder to master.
4. Push the source to Github: `git push origin dev`.
