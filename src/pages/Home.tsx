import React, { useEffect, useState } from 'react';
import {
    View, 
    Text, 
    StyleSheet, 
    TextInput, 
    Platform,
    FlatList      
} from 'react-native';
import { Button } from '../components/Button';
import { SkillCard } from '../components/SkillCard';

// tipagem do estado mySkill
interface SkillData {
    id: string;
    name: string;    
}

export function Home(){

  // armazena a nova skill digitada  
  const [newSkill, setNewSkill] = useState('');  
  // armazena todas as skills digitadas
  const [mySkills, setMySkills] = useState<SkillData[]>([]);  
  // armazena a saudação
  const [gretting, setGretting] = useState(''); 


  // utilizar a convenção handle quando a função for disparada
  // por uma interação do usuário [ex:click do usuário].  
  function handleAddNewSkill(){    
    // Definindo a tipagem para o estado mySkill
    // Quais as propriedade que ele vai ter.
    const data = {
        // sempre usar string para id(keys) nos elementos
        id: String(new Date().getTime()),
        name: newSkill 
    }          
    setMySkills(oldState => [...oldState, data]);  
  }

  // Função para remover a skill no evendo onPress
  function handleRemoveSkill(id:string){
    setMySkills(oldState => [...oldState.filter(
        skill=> skill.id !== id
    )])
  }

  // Dispara o useEffect durante a montagem do componente.
  useEffect(()=>{
    const currentHour = new Date().getHours();
   
    if (currentHour < 12) {
        setGretting('Goog morning!');
    } else if(currentHour >= 12 && currentHour < 18){
        setGretting('Good afternoon!'); 
    }else {
        setGretting('Good night!');
    }
    
  },[]);

    return (
    
        <View style={ styles.container}>            
            <Text style={styles.title}>
                Welcome, Marlon
            </Text>                
            <Text style={styles.greetings}>
                { gretting }
            </Text>
            <TextInput
                style={styles.input}
                placeholder='New skill'
                placeholderTextColor='#555'
                onChangeText={setNewSkill}
            />                   
            <Button 
                title='Add'                
                onPress={handleAddNewSkill}                
            />            
            <Text style={[styles.title,{marginVertical:50}]}>
                My Skills
            </Text>
            <FlatList
                data={mySkills}
                keyExtractor={item => item.id}                
                renderItem={({ item }) => (
                    <SkillCard 
                        skill={item.name}
                        onPress={() => handleRemoveSkill(item.id)}
                    />
                )}
            />     
        </View>          
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,        
        backgroundColor: '#121015', 
        paddingHorizontal: 30,
        paddingVertical: 70             
    },
    title: {
        color: '#fff',
        fontSize: 24,
        fontWeight:'bold'
    },
    input: {
        backgroundColor:'#1F1e25',
        color:'#fff',
        fontSize:18,
        padding: Platform.OS === 'ios'? 15 : 10,
        marginTop:30,
        borderRadius: 7
    },
    greetings:{
        color:'#FFF'
    }
});