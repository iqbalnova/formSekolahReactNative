import {Alert, StyleSheet, Text, TouchableOpacity, View} from 'react-native';
import React, {useState} from 'react';
import DropDownPicker from 'react-native-dropdown-picker';
import {ScrollView, TextInput} from 'react-native-gesture-handler';
import {SafeAreaView} from 'react-native-safe-area-context';
import {Formik} from 'formik';
import * as Yup from 'yup';
import ImageCropPicker from 'react-native-image-crop-picker';

const Form = ({navigation}) => {
  const [photo, setPhoto] = useState('');
  const [openTipeSekolah, setOpenTipeSekolah] = useState(false);
  const [valueTipeSekolah, setValueTipeSekolah] = useState(null);
  const [itemsTipeSekolah, setItemsTipeSekolah] = useState([
    {label: 'Negeri', value: 'negeri'},
    {label: 'Swasta', value: 'swasta'},
  ]);
  const [openProvinsi, setOpenProvinsi] = useState(false);
  const [valueProvinsi, setValueProvinsi] = useState(null);
  const [itemsProvinsi, setItemsProvinsi] = useState([
    {label: 'Jawa Tengah', value: 'jateng'},
    {label: 'Jawa Barat', value: 'jabar'},
    {label: 'Jawa Timur', value: 'jatim'},
  ]);
  const [openKabupaten, setOpenKabupaten] = useState(false);
  const [valueKabupaten, setValueKabupaten] = useState(null);
  const [itemsKabupaten, setItemsKabupaten] = useState([
    {label: 'Klaten', value: 'klaten'},
    {label: 'Sleman', value: 'sleman'},
  ]);

  // For validation
  const validationSignIn = Yup.object().shape({
    email: Yup.string()
      .email('Email tidak valid')
      .required('Email tidak boleh kosong'),
    namaSekolah: Yup.string().required('Nama sekolah tidak boleh kosong'),
    alamat: Yup.string().required('Alamat sekolah tidak boleh kosong'),
    kodePos: Yup.string()
      .max(5, 'Kode Pos max 5 digit')
      .required('Kode Pos tidak boleh kosong'),
    noTelp: Yup.number().required('No Telp tidak boleh kosong'),
    jmlSiswa: Yup.number()
      .min(1, 'Minimal 1')
      .max(100, 'Maksimal 100')
      .required('Jumlah siswa harus diisi'),
  });

  const submitBtn = () => {
    if (!valueTipeSekolah) {
      Alert.alert('Ups', 'Tipe Sekolah belum diisi');
    } else if (!valueKabupaten && !valueProvinsi) {
      Alert.alert('Ups', 'Kabupaten belum diisi');
    } else if (!valueProvinsi) {
      Alert.alert('Ups', 'Provinsi belum diisi');
    } else {
      Alert.alert('Horee!', 'Berhasil input');
    }
  };

  const chooseAvatar = () => {
    ImageCropPicker.openPicker({
      width: 300,
      height: 400,
      cropping: true,
    })
      .then(image => {
        setPhoto(image.path);
      })
      .catch(e => console.log(e));
  };

  return (
    <SafeAreaView>
      <Formik
        validationSchema={validationSignIn}
        initialValues={{
          namaSekolah: '',
          alamat: '',
          kodePos: '',
          noTelp: '',
          email: '',
          jmlSiswa: '',
        }}
        onSubmit={submitBtn}>
        {({
          handleChange,
          handleSubmit,
          values,
          handleBlur,
          errors,
          touched,
        }) => {
          return (
            <ScrollView style={styles.container}>
              <Text style={{margin: 10, color: 'black'}}>Data Sekolah</Text>
              <View>
                <View style={styles.form}>
                  <Text style={styles.txt}>Tipe Sekolah: *</Text>
                  <DropDownPicker
                    open={openTipeSekolah}
                    value={valueTipeSekolah}
                    items={itemsTipeSekolah}
                    setOpen={setOpenTipeSekolah}
                    setValue={setValueTipeSekolah}
                    setItems={setItemsTipeSekolah}
                  />
                </View>
                <View style={styles.form}>
                  <Text style={styles.txt}>Nama Sekolah: *</Text>
                  <TextInput
                    placeholder="Contoh: SMK Negeri 1 Bandung"
                    style={styles.txtInput}
                    onChangeText={handleChange('namaSekolah')}
                    onBlur={handleBlur('namaSekolah')}
                    value={values.namaSekolah}
                  />
                </View>
                {touched.namaSekolah && errors.namaSekolah && (
                  <Text style={{marginLeft: 10, color: 'red'}}>
                    {errors.namaSekolah}
                  </Text>
                )}
                <View style={styles.form}>
                  <Text style={styles.txt}>Upload foto: </Text>
                  <View style={{flexDirection: 'row'}}>
                    <TouchableOpacity
                      style={{
                        backgroundColor: '#e1ecf4',
                        height: 40,
                        padding: 10,
                        borderRadius: 7,
                        justifyContent: 'center',
                        alignItems: 'center',
                      }}
                      onPress={chooseAvatar}>
                      <Text style={{color: 'black'}}>Pilih dari galeri</Text>
                    </TouchableOpacity>
                    <View
                      style={{
                        justifyContent: 'center',
                        alignItems: 'center',
                        height: 40,
                      }}>
                      <Text>{photo}</Text>
                    </View>
                  </View>
                </View>
                <View style={styles.form}>
                  <Text style={styles.txt}>Alamat: *</Text>
                  <TextInput
                    style={styles.txtInput}
                    onChangeText={handleChange('alamat')}
                    onBlur={handleBlur('alamat')}
                    value={values.alamat}
                  />
                </View>
                {touched.alamat && errors.alamat && (
                  <Text style={{marginLeft: 10, color: 'red'}}>
                    {errors.alamat}
                  </Text>
                )}
                <View style={styles.form}>
                  <Text style={styles.txt}>Kode Pos: *</Text>
                  <TextInput
                    keyboardType="numeric"
                    style={styles.txtInput}
                    onChangeText={handleChange('kodePos')}
                    onBlur={handleBlur('kodePos')}
                    value={values.kodePos}
                  />
                </View>
                {touched.kodePos && errors.kodePos && (
                  <Text style={{marginLeft: 10, color: 'red'}}>
                    {errors.kodePos}
                  </Text>
                )}
                <View style={styles.form}>
                  <Text style={styles.txt}>Provinsi: *</Text>
                  <DropDownPicker
                    open={openProvinsi}
                    value={valueProvinsi}
                    items={itemsProvinsi}
                    setOpen={setOpenProvinsi}
                    setValue={setValueProvinsi}
                    setItems={setItemsProvinsi}
                    dropDownDirection={'TOP'}
                  />
                </View>
                <View style={styles.form}>
                  <Text style={styles.txt}>Kabupaten: *</Text>
                  <DropDownPicker
                    open={openKabupaten}
                    value={valueKabupaten}
                    items={itemsKabupaten}
                    setOpen={setOpenKabupaten}
                    setValue={setValueKabupaten}
                    setItems={setItemsKabupaten}
                  />
                </View>
                <View style={styles.form}>
                  <Text style={styles.txt}>No Telepon Sekolah: *</Text>
                  <TextInput
                    keyboardType="numeric"
                    style={styles.txtInput}
                    onChangeText={handleChange('noTelp')}
                    onBlur={handleBlur('noTelp')}
                    value={values.noTelp}
                  />
                </View>
                {touched.noTelp && errors.noTelp && (
                  <Text style={{marginLeft: 10, color: 'red'}}>
                    {errors.noTelp}
                  </Text>
                )}
                <View style={styles.form}>
                  <Text style={styles.txt}>Email Sekolah: *</Text>
                  <TextInput
                    style={styles.txtInput}
                    onChangeText={handleChange('email')}
                    onBlur={handleBlur('email')}
                    value={values.email}
                  />
                </View>
                {touched.email && errors.email && (
                  <Text style={{marginLeft: 10, color: 'red'}}>
                    {errors.email}
                  </Text>
                )}
                <View style={styles.form}>
                  <Text style={styles.txt}>Facebook: </Text>
                  <TextInput style={styles.txtInput} />
                </View>
                <View style={styles.form}>
                  <Text style={styles.txt}>Jumlah Siswa: *</Text>
                  <TextInput
                    style={styles.txtInput}
                    onChangeText={handleChange('jmlSiswa')}
                    onBlur={handleBlur('jmlSiswa')}
                    value={values.jmlSiswa}
                  />
                </View>
                {touched.jmlSiswa && errors.jmlSiswa && (
                  <Text style={{marginLeft: 10, color: 'red'}}>
                    {errors.jmlSiswa}
                  </Text>
                )}
              </View>
              <TouchableOpacity onPress={handleSubmit} style={styles.btn}>
                <Text
                  style={{
                    color: 'black',
                    textAlign: 'center',
                    justifyContent: 'center',
                    alignItems: 'center',
                  }}>
                  SUBMIT
                </Text>
              </TouchableOpacity>
            </ScrollView>
          );
        }}
      </Formik>
    </SafeAreaView>
  );
};

export default Form;

const styles = StyleSheet.create({
  container: {
    marginBottom: 20,
  },
  form: {
    marginHorizontal: 10,
  },
  txt: {
    marginVertical: 7,
    color: 'black',
  },
  txtInput: {
    borderWidth: 1,
    borderRadius: 8,
    backgroundColor: '#fff',
  },
  btn: {
    margin: 10,
    marginVertical: 20,
    paddingVertical: 10,
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: 6,
    backgroundColor: '#61dafb',
  },
});
