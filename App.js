import { StatusBar } from 'expo-status-bar';
import React , { useState} from 'react';
import { KeyboardAvoidingView, StyleSheet, Text, TouchableOpacity, View , TextInput ,Platform, FlatList, Keyboard} from 'react-native';
import Task from './components/Task';

export default function App() {

  const [task, setTask] = useState();
  const [taskItem,setTaskItem] = useState([]);

  const handleAddTask = () => {
    Keyboard.dismiss();
    setTaskItem([...taskItem, task]);
    setTask(null);
  }

  const completeTask = (index) => {
    let itemsCopy = [...taskItem]
    itemsCopy.splice(index,1)
    setTaskItem(itemsCopy)
  }

  return (
    <View style={styles.container}>

      {/* Today's Tasks */}
      <View style={styles.tasksWrapper}>
        <Text style={styles.sectionTitle}>Today's Tasks</Text>
        {/* items */}
        <View style={styles.items}>

          {
            taskItem.map((item,index) => (
              <TouchableOpacity key={index} onPress={() => completeTask(index)}>
                <Task  text={item}/>
              </TouchableOpacity>
              
            ))
          }
        </View>
      </View>

      {/* write a task */}
      <KeyboardAvoidingView
          behavior = {Platform.OS === "ios" ? "padding" : "height"}
          style = {styles.writeTaskWrapper}
      >
          <TextInput 
            style = {styles.input} 
            placeholder={'Write a task'} 
            value={task} 
            onChangeText={text => setTask(text)}
          >
          </TextInput>
          <TouchableOpacity onPress={() => handleAddTask()}>
            <View style={styles.addWraper}>
              <Text style={styles.addText}>+</Text>
            </View>
          </TouchableOpacity>
        </KeyboardAvoidingView>

    </View>
  );
}


// STYLES 
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#E8EAED',
  },
  tasksWrapper:{
    paddingTop: 80,
    paddingHorizontal: 20
  },
  sectionTitle: {
    fontSize:24,
    fontWeight: 'bold'
  },
  items: {
    marginTop: 30
  },
  writeTaskWrapper: {
    position: 'absolute',
    bottom: 60,
    width: '100%',
    flexDirection: 'row',
    justifyContent: 'space-around',
    alignItems: 'center'
  },
  input: {
    paddingVertical: 15,
    paddingHorizontal: 15,
    backgroundColor: '#FFF',
    borderRadius: 60,
    borderColor: '#C0C0C0',
    borderWidth: 1,
    width: 250
  },
  addWraper: {

  },
  addText: {

  }
});
