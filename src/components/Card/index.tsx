import { noop } from "lodash";
import * as React from "react";
import { StyleSheet } from "react-native";
import { Button, Card } from "react-native-paper";
import { CardEntity } from "./type";

const CustomCard: React.FC<CardEntity> = (props) => {
  const {
    title,
    subtitle,
    leftContent,
    content,
    coverImgurl,
    showFooter,
    cancelText,
    okText,
    handleCancel,
    handleOk,
  } = props;
  const onCancel = () => {
    handleCancel ? handleCancel : noop;
  };

  const onOk = () => {
    handleOk ? handleOk : noop;
  };
  return (
    <Card style={styles.cardContainer}>
      <Card.Title
        titleStyle={{
          alignItems: "center",
          textAlign: "center",
          fontWeight: "bold",
        }}
        title={title}
        subtitle={subtitle}
      />
      <Card.Content>{content}</Card.Content>
      {coverImgurl && <Card.Cover source={{ uri: coverImgurl }} />}
      {showFooter ? (
        <Card.Actions>
          <Button onPress={onCancel}>
            {cancelText ? cancelText : "Cancel"}
          </Button>
          <Button onPress={onOk}>{okText ? okText : "OK"}</Button>
        </Card.Actions>
      ) : null}
    </Card>
  );
};

const styles = StyleSheet.create({
  cardContainer: {
    margin: 10,
    padding: 10,
  },
});

export default CustomCard;
