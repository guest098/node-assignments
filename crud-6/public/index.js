document.addEventListener('DOMContentLoaded',function(){
      var addUserButton=document.getElementById('addUser');
      var addUserForm=document.getElementById('addUserForm');
      var cancelButton=document.getElementById('cancel');
      var cancelEditButton=document.getElementById('cancelEdit');
      var editUserForm=document.getElementById('editUserForm');
      addUserButton.addEventListener('click',function(){
          addUserButton.style.display='none';
          addUserForm.style.display=addUserForm.style.display==='none'?'block':'none';
      });
      cancelButton.addEventListener('click',function(){
           addUserForm.style.display='none';
           addUserButton.style.display='block';
      });
      cancelEditButton.addEventListener('click',function(){
           editUserForm.style.display='none';
           addUserButton.style.display='block';
      });
      addUserForm.addEventListener('submit',function(event){
        event.preventDefault();
        submitUser();
      });
      editUserForm.addEventListener('submit',function(event){
        event.preventDefault();
        const id=editUserForm.dataset.userId;
        updateUser(id);
      });
      fetch('/roles').then(response=>response.json()).then(users=>loadusers(users));
});
function validateform(form){
    const fields=['role_name','department','responsibilities','qualifications','salary'];
    for(let i in fields){
        if(!form[i].value.trim()){
            alert(`Please fill out the ${i.replace('_',' ')} field`);
            return false;
        }
    }
    return true;
}
function loadusers(users){
    let userContainer=document.getElementById('container');
    userContainer.innerHTML='';
    users.forEach(user=>{
        let userDiv=document.createElement('div');
        userDiv.className='user-container';
        userDiv.innerHTML=`<h2>${user.role_name}</h2>
            <p>Department: ${user.department}</p>
            <p>Responsibilities: ${user.responsibilities}</p>
            <p>Qualifications: ${user.qualifications}</p>
            <p>Salary: ${user.salary}</p>
            <button onclick="editUser(${user.id})">Edit</button>
            <button onclick="deleteUser(${user.id})">Delete</button>`
        userContainer.appendChild(userDiv);
    });
}
function submitUser(){
    const form=document.getElementById('addUserForm');
    if(validateform(form)){
        alert('Form Submitted Succesfully');
    }
    const formData=new FormData(form);
    fetch('/roles',{
        method:'POST',
        headers:{
            'Content-Type':'application/json',
        },
        body:JSON.stringify({
            role_name:formData.get('role_name'),
            department:formData.get('department'),
            responsibilities:formData.get('responsibilities'),
            qualifications:formData.get('qualifications'),
            salary:formData.get('salary'),
        }),
    }).then(response=>response.json()).then(data=>{
        console.log(data);
        form.reset();
        form.style.display='none';
        document.getElementById('addUser').style.display='block';
        fetch('/roles').then(response=>response.json()).then(users=>loadusers(users));
    });
}
function editUser(id){
    fetch(`/roles/${id}`,{
        method:'GET',
    }).then(response=>response.json()).then(data=>{
        if(data.length>0){
            const user=data[0];
            document.getElementById('edit_role_name').value=user.role_name;
            document.getElementById('edit_department').value=user.department;
            document.getElementById('edit_responsibilities').value=user.responsibilities;
            document.getElementById('edit_qualifications').value=user.qualifications;
            document.getElementById('edit_salary').value=user.salary;
            document.getElementById('editUserForm').dataset.userId = id;
            document.getElementById('editUserForm').style.display='block';
            document.getElementById('addUser').style.display='none';
        }
    });
}
function updateUser(id) {
    const form=document.getElementById('editUserForm');
    const formData=new FormData(form);
    if(validateform(form)){
        alert('Form updated successfully!');
    }
    fetch(`/roles/${id}`,{
        method:'PUT',
        headers:{
            'Content-Type': 'application/json',
        },
        body:JSON.stringify({
            role_name:formData.get('role_name'),
            department:formData.get('department'),
            responsibilities:formData.get('responsibilities'),
            qualifications:formData.get('qualifications'),
            salary:formData.get('salary'),
        }),
    })
    .then(response=>response.json())
    .then(data=>{
        console.log(data);
        form.reset();
        form.style.display='none';
        document.getElementById('addUser').style.display='block';
        fetch('/roles').then(response=>response.json()).then(users=>loadusers(users));
    });
}

function deleteUser(id){
    fetch(`/roles/${id}`,{
        method:'DELETE', 
    }).then(response=>response.json()).then(data=>{
        console.log(data);
        fetch('/roles').then(response=>response.json()).then(users=>loadusers(users));
    });
}