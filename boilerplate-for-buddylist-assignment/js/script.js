function display(){
    var updatedUsers=JSON.parse(localStorage.getItem('users'));
    const rootContainer=document.getElementById('root');
    rootContainer.innerHTML='';
    updatedUsers.forEach(function(user) {
        adduserdata(user);
    });
}
let status={
	1:"one",
	2:"two",
	3:"three",
	4:"four",
};
let users_json=[{
		userId:1,
		name:"Jon Snow",
		profilePicture:
			"https://th.bing.com/th/id/R.d07e9ae2d39ce8322db04589214dec11?rik=ATfy%2bNuznj3dqg&riu=http%3a%2f%2fcdn.wallpapersafari.com%2f51%2f13%2f5OcUPQ.jpg&ehk=MUFAOT454psmbnOJCehYpjWid7XdW%2bpIicC6hFfu48k%3d&risl=&pid=ImgRaw&r=0",
		statusMessage: "We become what we think about!",
		presence: 1,
	},
	{
		userId: 2,
		name: "Daenerys Targaryen",
		profilePicture:
			"https://preview.redd.it/hlxen8gtwpm01.jpg?width=640&crop=smart&auto=webp&v=enabled&s=a3c43bcbfc1db31d542ef67071559264358b3d2b",
		statusMessage: "A positive mindset brings positivethings.",
		presence: 3,
	},
	{
		userId: 3,
		name: "Tyrion Lannister",
		profilePicture:
			"https://mir-s3-cdn-cf.behance.net/project_modules/fs/6a3f5237411193.573f25019c8bf.jpg",
		statusMessage: "One small positive thought can change your whole day",
		presence: 3,
	},
	{
		userId: 4,
		name: "Jaime Lannister",
		profilePicture:
			"https://images.nightcafe.studio/jobs/mWfF1s7OOVg5DMTYiNZ8/mWfF1s7OOVg5DMTYiNZ8--4--qccau.jpg?tr=w-1600,c-at_max",
		statusMessage: "I am a rockstar",
		presence: 1,
	},
	{
		userId: 5,
		name: "Arya Stark",
		profilePicture:
			"https://64.media.tumblr.com/21de4501827aba1c6463ce2ae6a36780/tumblr_ps5le9xxRb1w9a5vgo1_1280.jpg",
		statusMessage: "I am using Gradious messenger",
		presence: 4,
}];
function addUser(){
    event.preventDefault();
    var existingUsers=JSON.parse(localStorage.getItem('users') || '[]');
    var count=existingUsers.length;
    count++;
    var id1=count;
    var name=document.getElementById("name").value;
    var profilePicture=document.getElementById("profilePicLink").value;
    var statusMessage=document.getElementById("statusMessage").value;
    var presence=document.getElementById("presence").value;
    var newUser={
        userId:id1,
        name:name,
        statusMessage:statusMessage,
        profilePicture:profilePicture,
        presence:presence
    };
    adduserdata(newUser);
    existingUsers.push(newUser);
    console.log(existingUsers);
    localStorage.setItem("users",JSON.stringify(existingUsers));
    localStorage.setItem("count",count.toString());
    document.getElementById("name").value = "";
    document.getElementById("profilePicLink").value = "";
    document.getElementById("statusMessage").value = "";
    document.getElementById("presence").selectedIndex = 0;
}
var count1=localStorage.getItem("users");
if(count1==null){
	localStorage.setItem("users",JSON.stringify(users_json));
}
function adduserdata(user) {
    var userElement=document.createElement('div');
    userElement.classList.add('user');
    var imgContainer=document.createElement('div');
    imgContainer.classList.add('img-container');
    var img=document.createElement('img');
    img.src=user.profilePicture;
    img.alt='user image';
    img.classList.add('user-image', status[user.presence]);
    imgContainer.appendChild(img);
    var detailContainer = document.createElement('div');
    detailContainer.classList.add('user-detail');
    var namePara=document.createElement('p');
    namePara.classList.add('user-name');
    namePara.textContent=user.name;
    var messagePara=document.createElement('p');
    messagePara.classList.add('user-message');
    messagePara.textContent = user.statusMessage;
    detailContainer.appendChild(namePara);
    detailContainer.appendChild(messagePara);
    var dropdownContainer = document.createElement('div');
    dropdownContainer.classList.add('three-btn');
    var dropdown = document.createElement('div');
    dropdown.classList.add('dropdown');
    var dropdownLink=document.createElement('a');
    dropdownLink.href='#';
    dropdownLink.role='button';
    dropdownLink.setAttribute('data-bs-toggle', 'dropdown');
    dropdownLink.setAttribute('aria-expanded', 'false');
    var dropdownIcon = document.createElement('i');
    dropdownIcon.classList.add('bi', 'bi-three-dots-vertical');
    dropdownLink.appendChild(dropdownIcon);
    var dropdownMenu = document.createElement('ul');
    dropdownMenu.classList.add('dropdown-menu');
    var deleteButton = document.createElement('button');
    deleteButton.id = 'delete-' + user.userId;
    deleteButton.classList.add('dropdown-item');
    deleteButton.textContent = 'Delete';
    deleteButton.onclick = function() {
        deleteUser(user.userId);
    };
    var updateButton = document.createElement('button');
    updateButton.id = 'update-' + user.userId;
    updateButton.classList.add('dropdown-item');
    updateButton.textContent = 'Update';
    updateButton.onclick = function() {
        updateItem(user.userId);
    };
    dropdownMenu.appendChild(deleteButton);
    dropdownMenu.appendChild(updateButton);
    dropdown.appendChild(dropdownLink);
    dropdown.appendChild(dropdownMenu);
    dropdownContainer.appendChild(dropdown);
    userElement.appendChild(imgContainer);
    userElement.appendChild(detailContainer);
    userElement.appendChild(dropdownContainer);
    var rootContainer = document.getElementById('root');
    rootContainer.appendChild(userElement);
}
window.onload=function(){
   display();
};
function deleteUser(userId){
    console.log(userId);
    var existingUsers=JSON.parse(localStorage.getItem('users'));
    var filteredUsers=existingUsers.filter(function(user) {
        return user.userId!==userId;
    });
    console.log(filteredUsers);
    localStorage.setItem('users',JSON.stringify(filteredUsers));
    var userElement=document.getElementById(userId);
    console.log(userElement);
    if(userElement){
        userElement.parentNode.removeChild(userElement);
    }
    display();
}
function updateItem(userId){
    var existingUsers=JSON.parse(localStorage.getItem('users'));
    var userToUpdate=existingUsers.find((user)=>user.userId===parseInt(userId));
    document.getElementById("editName").value=userToUpdate.name;
    document.getElementById("editProfilePicLink").value=userToUpdate.profilePicture;
    document.getElementById("editStatusMessage").value=userToUpdate.statusMessage;
    document.getElementById("editPresence").selectedIndex=userToUpdate.presence - 1;
    document.getElementById("editUserForm").style.display="block";
    document.getElementById("addUserForm").style.display="none";
    document.getElementById("editUserForm").removeEventListener("submit",updateUserFormHandler);
    document.getElementById("editUserForm").addEventListener("submit",updateUserFormHandler);
    function updateUserFormHandler(event){
        event.preventDefault();
        userToUpdate.name=document.getElementById("editName").value;
        userToUpdate.profilePicture=document.getElementById("editProfilePicLink").value;
        userToUpdate.statusMessage=document.getElementById("editStatusMessage").value;
        userToUpdate.presence=document.getElementById("editPresence").selectedIndex + 1;
        localStorage.setItem("users",JSON.stringify(existingUsers));
        display();
    }
}
function visibileUserForm(){
    var addUserForm=document.getElementById("addUserForm");
    var editUserForm=document.getElementById("editUserForm");
    if (addUserForm.style.display!=="none") {
        addUserForm.style.display="none";
        editUserForm.style.display="block";
    } 
    else{
        editUserForm.style.display="none";
        addUserForm.style.display="block";
    }
}
