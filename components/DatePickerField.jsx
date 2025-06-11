import { useState } from 'react'
import { Pressable, Text } from 'react-native'
import DateTimePicker from '@react-native-community/datetimepicker'
import { Ionicons } from '@expo/vector-icons'

export default function DatePickerField({ value, setValue, style }) {
  const [show, setShow] = useState(false)
  return (
    <>
      <Text style={style.heading}>Datum</Text>
      <Pressable onPress={() => setShow(true)} style={style.input}>
        <Text style={[style.inputText, !value && style.placeholder]}>
          {value || "Datum auswählen"}
        </Text>
        <Ionicons name="calendar-outline" size={20} color="#888" style={{ marginLeft: 8 }} />
      </Pressable>
      {show && (
        <DateTimePicker
          value={value ? new Date(value.split('.').reverse().join('-')) : new Date()}
          mode="date"
          display="default"
          onChange={(event, selectedDate) => {
            setShow(false)
            if (selectedDate) {
              const d = selectedDate
              setValue(`${String(d.getDate()).padStart(2, '0')}.${String(d.getMonth() + 1).padStart(2, '0')}.${d.getFullYear()}`)
            }
          }}
        />
      )}
    </>
  )
}