document.addEventListener('DOMContentLoaded',function(){
    var addUserButton=document.getElementById('addUser');
    var addUserForm=document.getElementById('addUserForm');
    var cancelButton=document.getElementById('cancel');
    var cancelEditButton=document.getElementById('cancelEdit');
    var editUserForm=document.getElementById('editUserForm');
    const showOverviewButton=document.getElementById('showOverviewButton');
    const overviewContainer=document.getElementById('overviewContainer');
    const section=document.getElementById('roles-audit-trail-section');
    const button=document.getElementById('showAuditTrailButton');
    button.addEventListener('click',function(){
        if(section.style.display==='none') {
            section.style.display='block';
            button.textContent='Hide Roles Audit Trail'; 
            loadAuditTrailData();
        } 
        else{
            section.style.display='none';
            button.textContent='Show Roles Audit Trail';
        }
    });
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
    showOverviewButton.addEventListener('click',()=>{
        if(overviewContainer.style.display==='none'){
            overviewContainer.style.display='block';
            fetchOverviewData();
        } 
        else{
            overviewContainer.style.display='none';
        }
    });
    var addUserRole=document.getElementById('addUserRole');
    var addRoleForm=document.getElementById('addRoleForm');
    var cancelbtn=document.getElementById('cancelRole');
    var cancelEditRole=document.getElementById('cancelEditRole');
    var editRoleForm=document.getElementById('editRoleForm');
    addUserRole.addEventListener('click',function(){
        addUserRole.style.display='none';
        addRoleForm.style.display=addRoleForm.style.display==='none'?'block':'none';
    });
    cancelbtn.addEventListener('click',function(){
         addRoleForm.style.display='none';
         addUserRole.style.display='block';
    });
    cancelEditRole.addEventListener('click',function(){
         editRoleForm.style.display='none';
         addUserRole.style.display='block';
    });
    addRoleForm.addEventListener('submit',function(event){
      event.preventDefault();
      submitRole();
    });
    editRoleForm.addEventListener('submit',function(event){
      event.preventDefault();
      const id=editRoleForm.dataset.userId;
      updateRole(id);
    });
    fetch('/api/roles').then(response=>response.json()).then(users=>fetchusers(users));
    fetch('/api/users').then(response=>response.json()).then(users=>loadusers(users));
});
function loadusers(users){
    let userContainer=document.getElementById('container');
    userContainer.innerHTML='';
    users.forEach(user=>{
        let userDiv=document.createElement('div');
        userDiv.className='user-container';
        userDiv.innerHTML=`<h2>${user.username}</h2>
                <p>Role: ${user.role}</p>
                <button onclick="editUser(${user.id})">Edit</button>
                <button onclick="deleteUser(${user.id})">Delete</button>`
        userContainer.appendChild(userDiv);
    });
}
function submitUser(){
    const form=document.getElementById('addUserForm');
    const formData=new FormData(form);
    fetch('/api/users/create',{
        method:'POST',
        headers:{
            'Content-Type':'application/json',
        },
        body:JSON.stringify({
            username:formData.get('username'),
            password:formData.get('password'),
            role:formData.get('role')
        }),
    }).then(response=>response.json()).then(data=>{
        console.log(data);
        form.reset();
        form.style.display='none';
        document.getElementById('addUser').style.display='block';
        fetch('/api/users').then(response=>response.json()).then(users=>loadusers(users));
    });
}
function editUser(id){
    fetch(`/api/users/${id}`,{
        method:'GET',
    }).then(response=>response.json()).then(data=>{
        if(data.length>0){
            const user=data[0];
            document.getElementById('edit_username').value=user.username;
            document.getElementById('edit_password').value=user.password;
            document.getElementById('edit_role').value=user.role;
            document.getElementById('editUserForm').dataset.userId = id;
            document.getElementById('editUserForm').style.display='block';
            document.getElementById('addUser').style.display='none';
        }
    });
}
function updateUser(id) {
    const form = document.getElementById('editUserForm');
    const formData = new FormData(form);
    fetch(`/api/users/update/${id}`, {
        method: 'PUT',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({
            username: formData.get('edit_username'),
            password: formData.get('edit_password'),
            role: formData.get('edit_role'),
        }),
    })
    .then(response => response.json())
    .then(data => {
        console.log(data);
        form.reset();
        form.style.display = 'none';
        document.getElementById('addUser').style.display = 'block';
        fetch('/api/users')
            .then(response => response.json())
            .then(users => loadusers(users));
    });
}
function deleteUser(id){
    fetch(`/api/users/delete/${id}`,{
        method:'DELETE', 
    }).then(response=>response.json()).then(data=>{
        console.log(data);
        fetch('/api/users').then(response=>response.json()).then(users=>loadusers(users));
    });
}
function fetchusers(users){
    let userContainer=document.getElementById('container1');
    userContainer.innerHTML='';
    users.forEach(user=>{
        let userDiv=document.createElement('div');
        userDiv.className='user-container';
        userDiv.innerHTML=`<h2>${user.role_name}</h2>
            <p>Department: ${user.department}</p>
            <p>Responsibilities: ${user.responsibilities}</p>
            <p>Qualifications: ${user.qualifications}</p>
            <p>Salary: ${user.salary}</p>
            <button onclick="editRole(${user.id})">Edit</button>
            <button onclick="deleteRole(${user.id})">Delete</button>`
        userContainer.appendChild(userDiv);
    });
}
function submitRole() {
    const form=document.getElementById('addRoleForm');
    const formData=new FormData(form);
    fetch('/api/roles/create',{
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
    })
    .then(response=>response.json())
    .then(data=>{
        console.log(data);
        form.reset();
        form.style.display='none';
        document.getElementById('addUserRole').style.display='block';
        fetch('/api/roles').then(response=>response.json()).then(users=>fetchusers(users));
    })
    .catch(error => console.error('Error:', error));
}
function editRole(id){
    fetch(`/api/roles/${id}`,{
        method:'GET',
    }).then(response=>response.json()).then(data=>{
        if(data.length>0){
            const user=data[0];
            document.getElementById('edit_role_name').value=user.role_name;
            document.getElementById('edit_department').value=user.department;
            document.getElementById('edit_responsibilities').value=user.responsibilities;
            document.getElementById('edit_qualifications').value=user.qualifications;
            document.getElementById('edit_salary').value=user.salary;
            document.getElementById('editRoleForm').dataset.userId = id;
            document.getElementById('editRoleForm').style.display='block';
            document.getElementById('addUserRole').style.display='none';
        }
    });
}
function updateRole(id) {
    const form=document.getElementById('editRoleForm');
    const formData=new FormData(form);
    fetch(`/api/roles/update/${id}`,{
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
        document.getElementById('addUserRole').style.display='block';
        fetch('/api/roles').then(response=>response.json()).then(users=>fetchusers(users));
    });
}
function deleteRole(id){
    fetch(`/api/roles/delete/${id}`,{
        method:'DELETE', 
    }).then(response=>response.json()).then(data=>{
        console.log(data);
        fetch('/api/roles').then(response=>response.json()).then(users=>fetchusers(users));
    });
}
function fetchOverviewData() {
    fetch('/admin/roles/overview')
        .then(response=>response.json())
        .then(data=>{
            document.getElementById('total-roles').innerText=data.totalRoles;
            const departmentsList=document.getElementById('departments-list');
            departmentsList.innerHTML='';
            data.departments.forEach(dept=>{
                const li=document.createElement('li');
                li.innerText=`${dept.department}:${dept.departmentCount} roles`;
                departmentsList.appendChild(li);
            });
            document.getElementById('avg-salary').innerText=`$${data.avgSalary}`;
        })
        .catch(error=>{
            console.error('Error fetching role overview:',error);
        });
}
function loadAuditTrailData(){
    fetch('/admin/roles-audit-trail') 
        .then(response=>response.json())
        .then(data=>{
            const container=document.getElementById('roles-audit-trail-container');
            container.innerHTML=''; 
            data.forEach(record=>{
                const item=document.createElement('div');
                item.className='role-audit-item';
                item.innerHTML=`
                    <h3>Role Name: ${record.role_name}</h3>
                    <p><strong>Action:</strong> ${record.action}</p>
                    <p><strong>Admin:</strong> ${record.admin_name}</p>
                    <p><strong>Timestamp:</strong> ${new Date(record.created_at).toLocaleString()}</p>
                `;
                container.appendChild(item);
            });
        })
        .catch(error=>console.error('Error fetching roles audit trail:',error));
}