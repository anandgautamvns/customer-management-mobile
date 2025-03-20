import { ListRenderItem } from "react-native";

export interface ListItemEntity<T> {
  data: T[];
  renderItem: ListRenderItem<T> | null | undefined;
}