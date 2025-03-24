export interface CardEntity {
  title: string | React.ReactNode;
  subtitle?: string | React.ReactNode;
  leftContent?: string | React.ReactNode;
  content: string | React.ReactNode;
  coverImgurl?: string;
  showFooter: boolean;
  cancelText?: string;
  okText?: string;
  handleCancel?: () => void;
  handleOk?: () => void;
}
