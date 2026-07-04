document.querySelectorAll("a").forEach(link => {

    link.addEventListener("click", function (e) {

        const url = this.getAttribute("href");

        if (
            !url ||
            url.startsWith("#") ||
            url.startsWith("http") ||
            this.target === "_blank"
        ) {
            return;
        }

        e.preventDefault();

        document.body.classList.add("page-exit");

        setTimeout(() => {

            window.location.href = url;

        }, 350);

    });

});