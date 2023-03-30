//using IdentityServer4.Models;
//using IdentityServer4.Test;
//using Microsoft.AspNetCore.Authentication.JwtBearer;
//using Microsoft.IdentityModel.Tokens;
//using IdentityServer4.Validation;
//using Microsoft.Extensions.DependencyInjection;

using FoodAppWeb.Context;
using Microsoft.AspNetCore.Authentication.JwtBearer;
using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.Options;
using Microsoft.IdentityModel.Tokens;
using Microsoft.OpenApi.Models;
using System.Text;

var builder = WebApplication.CreateBuilder(args);
var provider = builder.Services.BuildServiceProvider();
var configuration = provider.GetRequiredService<IConfiguration>();
// Add services to the container.


//public void ConfigureServices(IServiceCollection services)
//{
//    // Add authentication
//    services.AddAuthentication(options => {
//        options.DefaultAuthenticateScheme = JwtBearerDefaults.AuthenticationScheme;
//        options.DefaultChallengeScheme = JwtBearerDefaults.AuthenticationScheme;
//    })
//        .AddJwtBearer(options => {
//            options.Authority = "https://localhost:5001";
//            options.Audience = "your-scope";
//            options.TokenValidationParameters = new TokenValidationParameters
//            {
//                ValidateIssuerSigningKey = true,
//                IssuerSigningKey = new SymmetricSecurityKey(Encoding.UTF8.GetBytes("your-signing-key")),
//                ValidateIssuer = false,
//                ValidateAudience = false
//            };
//        });
//    services.AddIdentityServer()
//        .AddInMemoryClients(new[] {
//            new Client
//            {
//                ClientId = "client-id",
//                AllowedGrantTypes = GrantTypes.ClientCredentials,
//                ClientSecrets = {
//                    new Secret("client-secret".Sha256())
//                },
//                AllowedScopes = { "your-scope" }
//            }
//        })
//        .AddInMemoryApiResources(new[] {
//            new ApiResource("your-scope", "Your API Scope")
//        })
//        .AddTestUsers(new[] {
//            new TestUser {
//                SubjectId = "1",
//                Username = "user",
//                Password = "password"
//            }
//        })
//        .AddDeveloperSigningCredential();
//}



builder.Services.AddControllers().AddJsonOptions(options =>
{
    options.JsonSerializerOptions.PropertyNamingPolicy = null;
});
builder.Services.AddDbContext<ApplicationDBContext>(option =>option.UseSqlServer(builder.Configuration.GetConnectionString("DefaultConnection")));
// Learn more about configuring Swagger/OpenAPI at https://aka.ms/aspnetcore/swashbuckle
builder.Services.AddEndpointsApiExplorer();
builder.Services.AddSwaggerGen(c =>
{
    c.SwaggerDoc("v1", new OpenApiInfo { Title = "FoodApp", Version = "v1" });
    c.AddSecurityDefinition("Bearer", new OpenApiSecurityScheme
    {
        Description = "Jwt Authorization",
        Name = "Authorization",
        In = ParameterLocation.Header,
        Type = SecuritySchemeType.ApiKey,
        Scheme = "Bearer"
    });
    c.AddSecurityRequirement(new OpenApiSecurityRequirement
{
    {
        new OpenApiSecurityScheme
        {
            Reference = new OpenApiReference
            {
                Type = ReferenceType.SecurityScheme,
                Id = "Bearer"
            }
        },
        new string[] { }
    }
});

});
builder.Services.AddAuthentication(JwtBearerDefaults.AuthenticationScheme).AddJwtBearer(options =>
{
    options.TokenValidationParameters = new TokenValidationParameters
    {
        ValidateIssuer = true,
        ValidateAudience = true,
        ValidateLifetime = true,
        ValidateIssuerSigningKey = true,
        ValidIssuer = builder.Configuration["Jwt:Issuer"],
        ValidAudience = builder.Configuration["Jwt:Audience"],
        IssuerSigningKey = new SymmetricSecurityKey(Encoding.UTF8.GetBytes(builder.Configuration["Jwt:key"]))
    };
});
builder.Services.AddCors(Options =>
{
    var frondendUrl = configuration.GetValue<string>("frontend_url");
    Options.AddDefaultPolicy(builder =>
    {
        builder.WithOrigins(frondendUrl).AllowAnyOrigin().AllowAnyHeader();

    });
});
var app = builder.Build();

// Configure the HTTP request pipeline.
if (app.Environment.IsDevelopment())
{
    app.UseSwagger();
    app.UseSwaggerUI(c=>c.SwaggerEndpoint("/swagger/v1/swagger.json","FoodAppJWTToken v1"));
}

app.UseHttpsRedirection();

app.UseCors();
app.UseAuthentication();
app.UseAuthorization();

app.MapControllers();

app.Run();
