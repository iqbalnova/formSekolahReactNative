import {StyleSheet, Text, View} from 'react-native';
import React, {useState} from 'react';
import DropDownPicker from 'react-native-dropdown-picker';
import {TextInput} from 'react-native-gesture-handler';

const Form = () => {
  const [openTipeSekolah, setOpenTipeSekolah] = useState(false);
  const [value, setValue] = useState(null);
  const [items, setItems] = useState([
    {label: 'Negeri', value: 'negeri'},
    {label: 'Swasta', value: 'swasta'},
  ]);
  return (
    <View>
      <Text>Form</Text>
      <View>
        <View style={styles.form}>
          <Text style={styles.txt}>Tipe Sekolah: *</Text>
          <DropDownPicker
            open={openTipeSekolah}
            value={value}
            items={items}
            setOpen={setOpenTipeSekolah}
            setValue={setValue}
            setItems={setItems}
          />
        </View>

        <View style={styles.form}>
          <Text style={styles.txt}>Alamat: *</Text>
          <TextInput
            style={{
              borderWidth: 1,
              borderRadius: 10,
              backgroundColor: '#fff',
            }}
          />
        </View>
        <View style={styles.form}>
          <Text style={styles.txt}>Kode Pos: *</Text>
          <TextInput
            keyboardType="numeric"
            style={{
              borderWidth: 1,
              borderRadius: 10,
              backgroundColor: '#fff',
            }}
          />
        </View>
        {/* <View style={styles.form}>
          <Text style={styles.txt}>Provinsi: *</Text>
          <DropDownPicker
          // open={open}
          // value={value}
          // items={items}
          // setOpen={setOpen}
          // setValue={setValue}
          // setItems={setItems}
          />
        </View>
        <View style={styles.form}>
          <Text style={styles.txt}>Kabupaten: *</Text>
          <DropDownPicker
          // open={open}
          // value={value}
          // items={items}
          // setOpen={setOpen}
          // setValue={setValue}
          // setItems={setItems}
          />
        </View> */}
      </View>
    </View>
  );
};

export default Form;

const styles = StyleSheet.create({
  form: {
    marginHorizontal: 10,
  },
  txt: {
    marginVertical: 7,
  },
});
