<template>
    <div>
        <Header v-on:logOutUser="logOutUser()" v-on:addNotes="getNotesFromTheServer()"/>
        <hr/>  
        <div v-for="(note,index) in NoteList"  :key="index">
            <NoteList 
            :currentNotes="note" v-on:deleteNotes="getNotesFromTheServer()" v-on:editNotes="getNotesFromTheServer()"/>
        </div>
        <div v-if="NoteList.length==0">
            <p> No notes found on server</p>
        </div>


    </div> 
    
</template>
<script>
import Header from "./Header";
import NoteList from "./NoteList";
export default {
   components:{
       Header,
       NoteList
   },

    data() {
        return {
            NoteList:[]
        }
    },
    mounted() {
        this.getNotesFromTheServer();
    },
    methods: {
        logOutUser(){
           this.$emit('logOutUser',false)
       },
        getNotesFromTheServer(){
            fetch('http://localhost:3000/notes',{
                    method:"GET",
                    headers: {
                        'Accept': 'application/json',
                        'Content-Type': 'application/json'
                    },
                   
                }).then(response=>{
                    return (response.json()) 
                }).then(responseJSON=>{
                    if(responseJSON.length>0){
                       this.NoteList=responseJSON;
                    }else if(responseJSON.message){
                        alert(responseJSON.message)
                    }
                    
                })
        }
    },
}
</script>

