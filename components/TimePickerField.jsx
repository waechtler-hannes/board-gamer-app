import { useState } from 'react'
import { Pressable, Text } from 'react-native'
import { Ionicons } from '@expo/vector-icons'
import DateTimePicker from '@react-native-community/datetimepicker'

export default function TimePickerField({ value, setValue, style }) {
  const [show, setShow] = useState(false)
  return (
    <>
      <Text style={style.heading}>Uhrzeit</Text>
      <Pressable onPress={() => setShow(true)} style={style.input}>
        <Text style={[style.inputText, !value && style.placeholder]}>
          {value || "Uhrzeit auswählen"}
        </Text>
        <Ionicons name="time-outline" size={20} color="#888" style={{ marginLeft: 8 }} />
      </Pressable>
      {show && (
        <DateTimePicker
          value={value ? new Date(new Date().toDateString() + ' ' + value) : new Date()}
          mode="time"
          display="default"
          onChange={(event, selectedTime) => {
            setShow(false)
            if (selectedTime) {
              const d = selectedTime
              setValue(`${String(d.getHours()).padStart(2, '0')}:${String(d.getMinutes()).padStart(2, '0')}`)
            }
          }}
        />
      )}
    </>
  )
}