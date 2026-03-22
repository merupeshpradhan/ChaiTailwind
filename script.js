// Run when page loads
window.onload = () => {
  applyChai();
};

// ================= CHAI Tailwind ENGINE =================
function applyChai() {
  document.querySelectorAll("*").forEach((el) => {
    el.classList.forEach((cls) => {
      if (cls.startsWith("chai-p-")) {
        el.style.padding = cls.split("-")[2] + "px";
      }

      if (cls.startsWith("chai-mb-")) {
        el.style.marginBottom = cls.split("-")[2] + "px";
      }

      if (cls.startsWith("chai-mt-")) {
        el.style.marginTop = cls.split("-")[2] + "px";
      }

      if (cls.startsWith("chai-w-")) {
        el.style.width = cls.split("-")[2] + "%";
      }

      if (cls.startsWith("chai-h-")) {
        el.style.height = cls.split("-")[2] + "px";
      }

      if (cls.startsWith("chai-bg-")) {
        el.style.backgroundColor = cls.split("-")[2];
      }

      if (cls.startsWith("chai-text-")) {
        let val = cls.split("-")[2];

        if (val === "center") {
          el.style.textAlign = "center";
        } else if (!isNaN(val)) {
          el.style.fontSize = val + "px";
        } else {
          el.style.color = val;
        }
      }

      if (cls.startsWith("chai-rounded-")) {
        el.style.borderRadius = cls.split("-")[2] + "px";
      }

      if (cls === "chai-flex") {
        el.style.display = "flex";
      }

      if (cls === "chai-flex-col") {
        el.style.display = "flex";
        el.style.flexDirection = "column";
      }

      if (cls === "chai-justify-center") {
        el.style.justifyContent = "center";
      }

      if (cls === "chai-items-center") {
        el.style.alignItems = "center";
      }

      if (cls.startsWith("chai-border-")) {
        let v = cls.split("-")[2];
        el.style.border = v + "px solid black";
      }

      if (cls === "chai-outline-none") {
        el.style.outline = "none";
      }

      if (cls === "chai-wrap") {
        el.style.flexWrap = "wrap";
      }

      if (cls.startsWith("chai-gap-")) {
        el.style.gap = cls.split("-")[2] + "px";
      }
    });
  });
}

// ================= IMAGE PREVIEW =================
document.getElementById("image").addEventListener("change", (e) => {
  let file = e.target.files[0];
  let preview = document.getElementById("preview");

  if (file) {
    preview.src = URL.createObjectURL(file);
    preview.style.display = "block"; // show image
  }
});

// ================= USER LOGIC =================
let users = [];

function addUser(event) {
  event.preventDefault(); // stops page reload

  let name = document.getElementById("name").value;
  let email = document.getElementById("email").value;
  let fileInput = document.getElementById("image");
  let file = fileInput.files[0];

  if (!name || !email || !file) {
    alert("Fill all fields");
    return;
  }

  let imageURL = URL.createObjectURL(file);

  users.unshift({ name, email, image: imageURL });

  displayUsers();

  // clear inputs
  document.getElementById("name").value = "";
  document.getElementById("email").value = "";
  fileInput.value = "";

  // hide preview
  let preview = document.getElementById("preview");
  preview.src = "";
  preview.style.display = "none";
}

// ================= DELETE USER =================
function deleteUser(index) {
  users.splice(index, 1);
  displayUsers();
}

// ================= DISPLAY USERS =================
function displayUsers() {
  let list = document.getElementById("list");
  list.innerHTML = "";

  users.forEach((user, index) => {
    let div = document.createElement("div");

    div.className =
      "chai-p-10 chai-bg-white chai-flex chai-flex-col chai-items-center chai-rounded-10 chai-w-23";

    div.innerHTML = `
      <img src="${user.image}" class="chai-w-70 chai-h-200 chai-rounded-20"><br>
      <b>${user.name}</b><br>
      ${user.email}

      <button onclick="deleteUser(${index})"
        class="chai-mt-10 chai-p-5 chai-bg-red chai-text-white chai-rounded-5">
        Delete
      </button>
    `;

    list.appendChild(div);
  });

  applyChai();
}
