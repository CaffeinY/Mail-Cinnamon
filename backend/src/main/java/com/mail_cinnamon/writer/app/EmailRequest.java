package com.mail_cinnamon.writer.app;


import lombok.Data;

@Data
public class EmailRequest {
    private String emailContent;
    private String tone;
    private String userPrompt;
}
