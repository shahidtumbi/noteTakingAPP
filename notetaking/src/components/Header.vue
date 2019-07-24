<template>
  <div>
    <b-navbar toggleable="lg"  fixed>
    <b-navbar-brand >Note Taking</b-navbar-brand>
     <b-nav-item  style="    list-style: none;">
          <b-button variant="success" size="lg" class="p-2" v-b-modal.addNote >Add Notes</b-button>
    </b-nav-item>
    <b-nav-item  right style="    list-style: none;">
          <b-button variant="danger" size="lg" class="p-2" @click="logOutUser">Log Out</b-button>
    </b-nav-item>
  </b-navbar>
  <div>
     <b-modal id="addNote" title="Add Note" @ok="addNotesToServer()">
    	<b-container>
            <b-row align-v="center">
                <b-col sm="12" class="m-3">
                <b-form-input
                    v-model="noteTitle"
                    id="input-1"
                    type="text"
                    required
                    placeholder="Enter Title"
                    ></b-form-input>
                </b-col>
            </b-row>
            
            <b-row align-v="center">
                <b-col sm="12" class="m-3">
                <b-form-input
                    v-model="noteContent"
                    type="text"
                    required
                    placeholder="Enter Content"
                    ></b-form-input>
                </b-col>
            </b-row>
        </b-container>
  </b-modal>
  </div>
  </div>
</template>
<script>
export default {
  methods: {
    logOutUser(){
      console.log('Log Out User')
      this.$emit('logOutUser',false);
	},
	
	addNotesToServer(){
		console.log('Adding Notes to Server')
		if(this.noteTitle==""||this.noteContent==""){
			alert("Title and Content are Complusary");
		}else {
			fetch('http://localhost:3000/notes',{
                    method:"POST",
                    headers: {
                        'Accept': 'application/json',
                        'Content-Type': 'application/json'
					},
					body:JSON.stringify({
						title:this.noteTitle,
						content:this.noteContent
					})
                   
                }).then(response=>{
                    return (response.json()) 
                }).then(responseJSON=>{
					console.log(responseJSON)
					 this.$emit('addNotes')
                })
		}
	}
  },
  data() {
		return {
			noteContent:'',
			noteTitle:''
		}
	},
}
</script>
