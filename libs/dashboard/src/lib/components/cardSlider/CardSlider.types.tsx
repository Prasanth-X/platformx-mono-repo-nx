export type CreateCard = {
  image_1: {
    ImageCropUrl: {
      CropUrl: {
        Web: string;
      };
    };
  };
  title: string;
  bgColor: string;
  url: string;
};

export type CreateCardProps = {
  createContent: CreateCard[];
  colorList: string[];
};
