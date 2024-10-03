import { RequestWithToast } from "@/interceptor";

export const postMail = (data: any) => {
  return RequestWithToast({
    method: "post",
    url: "send",
    data: data,
  });
};