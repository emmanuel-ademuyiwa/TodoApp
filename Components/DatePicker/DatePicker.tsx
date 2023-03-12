import React, { useState } from "react";
import { Text, View, StyleSheet, Switch } from "react-native";
import RNDateTimePicker from "@react-native-community/datetimepicker";
import Moment from "moment";

const DatePicker = ({ setTheDate, setTheTime }: any) => {
  const [isEnabled, setIsEnabled] = useState(false);
  const [selectedTime, setSelectedTime] = useState<any>(new Date());
  const [selectedDate, setSelectedDate] = useState<Date>(new Date());

  const toggleSwitch = () => setIsEnabled((previousState) => !previousState);

  const setDate = (event: any, date: any) => {
    const newDate = Moment(date).format("MMMM Do, YYYY");
    setSelectedDate(date);
    setTheDate(newDate);
  };

  const setTime = (event: any, time: any) => {
    setSelectedTime(time);
    const data = new Date(time);
    const hrs = data.getHours();
    const mins = data.getMinutes();
    const reminder = hrs + ":" + mins;
    setTheTime(reminder);
  };

  return (
    <View style={styles.pickerContainer}>
      <View style={styles.dateContainer}>
        <RNDateTimePicker
          onChange={setDate}
          themeVariant="dark"
          value={selectedDate}
        />
      </View>
      <View style={styles.reminderContainer}>
        <View style={styles.switchContainer}>
          <Text style={styles.text}>Set Reminder ?</Text>
          <Switch
            style={{ transform: [{ scaleX: 0.8 }, { scaleY: 0.8 }] }}
            trackColor={{ false: "#fff", true: "#fff" }}
            thumbColor={isEnabled ? "#2196F3" : "#f4f3f4"}
            ios_backgroundColor="#3e3e3e"
            onValueChange={toggleSwitch}
            value={isEnabled}
          />
        </View>

        {isEnabled && (
          <RNDateTimePicker
            onChange={setTime}
            themeVariant="dark"
            value={selectedTime}
            mode="time"
          />
        )}
      </View>
    </View>
  );
};

export default DatePicker;

const styles = StyleSheet.create({
  pickerContainer: {
    display: "flex",
    flexDirection: "row",
    alignItems: "flex-start",
    justifyContent: "space-between",
    width: "100%",
  },
  dateContainer: {
    marginLeft: -12,
  },
  reminderContainer: {
    gap: 12,
  },
  text: {
    color: "#fff",
    fontSize: 16,
  },
  switchContainer: {
    display: "flex",
    flexDirection: "row",
    alignItems: "center",
    gap: 12,
  },
});
