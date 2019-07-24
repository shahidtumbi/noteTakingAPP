<template >
    <div style="margin-top:16%;padding:10px;height:200px">
        <b-container>
            <b-row align-v="center">
                <b-col sm="12" class="m-3">
                <b-form-input
                    v-model="email"
                    id="input-1"
                    type="email"
                    required
                    placeholder="Enter email"
                    ></b-form-input>
                </b-col>
            </b-row>
            
            <b-row align-v="center">
                <b-col sm="12" class="m-3">
                <b-form-input
                    v-model="password"
                    type="password"
                    required
                    placeholder="Enter Password"
                    ></b-form-input>
                </b-col>
            </b-row>
        </b-container>
        <div>
            <b-button variant="success" size="lg" class="p-2" @click="loginUser">Login</b-button>
        </div>
    </div>
</template>
<script>
export default {
    mounted() {
       // console.log('Mounted')
    },
    data() {
        return {
            email:'',
            password:''
        }
    },
    methods: {
        loginUser(){

            if(this.email==""||this.password==""){
                alert("Email and Password is missing");
                return false;
            }else{
                console.log(JSON.stringify({
                        email:this.email,
                        password:this.password
                    }))
                fetch('http://localhost:3000/login',{
                    method:"post",
                    headers: {
                        'Accept': 'application/json',
                        'Content-Type': 'application/json'
                    },
                    body:JSON.stringify({
                        email:this.email,
                        password:this.password
                    })
                }).then(response=>{
                    return (response.json()) 
                }).then(responseJSON=>{
                    if(responseJSON._id){
                        this.$emit('loginUser',true);
                    }else{
                        alert(responseJSON.message)
                    }
                    
                })
            }
           
            
        }
    },
}
</script>
