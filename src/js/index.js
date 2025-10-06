console.log("blogs-v 1.1.0")

// adding the active link
  let currentPath = window.location.pathname.replace(/\/$/, "");

  // Loop through all category links
  document.querySelectorAll(".blog-category-list a").forEach(link => {
    // Remove trailing slash from link href too
    let linkPath = link.getAttribute("href").replace(/\/$/, "");

    if (linkPath === currentPath) {
      link.classList.add("active"); // add the CSS class
    }
  });


// NAVIGATION : setting up the drop menu for mobile
document.querySelectorAll(" #categroy-dropdown ").forEach(element => {
    element.addEventListener("change",function(e){
      console.log("line21",e.target.value)
        if(e.target.value==='all'){
window.location.href='/' 
        }
        else{
window.location.href=`/category/${e.target.value}`
        }
})
});


//DROPDOWN VALUE : for mobile
document.querySelectorAll(" #categroy-dropdown ").forEach(element => {

        let categorySlug = window.location.pathname
  .replace(/\/$/, "")
  .split("/")        
  .pop();            
if(categorySlug ==''){
    element.value='all'
}
else{
element.value=categorySlug;
}
})

// NAVIGATION : setting up the drop menu for desktop
document.querySelectorAll(" #desktop-category-dropdown ").forEach(element => {
    element.addEventListener("change",function(e){
        if(e.target.value==='all'){
window.location.href='/' 
        }
        else{
window.location.href=`/category/${e.target.value}`
        }
})
});

// FIXED CATEGORIES ARRAY
const fixedCategoriesArray=["ipo-watch", "upi-credit","fintech-trends","startup-funding", "markets-and-policy"]

//DROPDOWN VALUE : for desktop
document.querySelectorAll(" #desktop-category-dropdown ").forEach((element,index) => {

        let categorySlug = window.location.pathname
  .replace(/\/$/, "")
  .split("/")        
  .pop();         
  console.log(categorySlug , fixedCategoriesArray.includes(categorySlug))   
if(categorySlug ==''){
   element.value='hh'
     console.log("hitting",categorySlug,element[index].value)
}
else if(fixedCategoriesArray.includes(categorySlug)){
  console.log("hitting",categorySlug,element[index])
 element.value='hh'
}
else{
element.value=categorySlug;
document.getElementById("category-dropdown-desktop-placeholder").style.display="none";
}
})




// sharing buttons
document.addEventListener("DOMContentLoaded", function () {
  const blogUrl = encodeURIComponent(window.location.href);
  const blogTitle = encodeURIComponent(document.title);

  if(  document.getElementById("linkedin-share")){
  document.getElementById("linkedin-share").href = `https://www.linkedin.com/shareArticle?mini=true&url=${blogUrl}&title=${blogTitle}`;
}
  if(document.getElementById("facebook-share")){
    document.getElementById("facebook-share").href = `https://www.facebook.com/sharer/sharer.php?u=${blogUrl}`;
  }
  if(document.getElementById("whatsapp-share")){
    document.getElementById("whatsapp-share").href = `https://wa.me/?text=${blogTitle}%20${blogUrl}`;
  }
  if(document.getElementById("instagram-share")){
    document.getElementById("instagram-share").href = `https://www.instagram.com`; // Instagram doesn't support direct sharing
  }

if(  document.getElementById("blog-details-share-btn")){
  document.getElementById("blog-details-share-btn").addEventListener("click", async () => {
    if (navigator.share) {
      try {
        await navigator.share({
          title: document.title,
          url: window.location.href,
        });
      } catch (err) {
        console.error("Share failed:", err);
      }
    } else {
      alert("Your browser does not support the native sharing feature.");
    }
  });
}
  
});

  const iconContainer = document.getElementById("blog-details-icon-container");

  window.addEventListener("scroll", () => {
    if (window.scrollY > 400) {
      iconContainer?.classList.add("show");
    } else {
      iconContainer?.classList.remove("show");
    }
  });


// PAGINATION
  document.addEventListener("DOMContentLoaded", () => {
  const blogs = document.querySelectorAll(".all-blogs-list .single-blog-container");
  const loadMoreBtn = document.getElementById("load-more-blogs-btn");
  let visibleCount = 12; // initially show 12
  const increment = 12;   // load 12 more each time

  // Show first 12
  blogs.forEach((blog, index) => {
    if (index < visibleCount) {
      blog.classList.add("visible");
    }
  });

  // On button click
  if(loadMoreBtn){
      loadMoreBtn.addEventListener("click", () => {
    const nextCount = visibleCount + increment;
    blogs.forEach((blog, index) => {
      if (index < nextCount) {
        blog.classList.add("visible");
      }
    });
    visibleCount = nextCount;

    // Hide button if all blogs are visible
    if (visibleCount >= blogs.length) {
      loadMoreBtn.style.display = "none";
    }
  });
  }
});
